import schema from "./payments-apps.schema";

export default class PaymentsAppsClient {
  constructor(shop, accessToken, type) {
    this.shop = shop;
    this.type = type || PAYMENT;
    this.accessToken = accessToken;
    this.resolveMutation = "";
    this.rejectMutation = "";
    this.pendingMutation = "";
    this.dependencyInjector(type);
  }

  async resolveSession({ id, gid }) {
    const response = await this.#perform(schema[this.resolveMutation], { id: gid });
    if (response?.userErrors?.length === 0) await this.update?.(id, RESOLVE);
    return response;
  }

  async rejectSession({ id, gid }) {
    const response = await this.#perform(schema[this.rejectMutation], {
      id: gid,
      reason: {
        code: "PROCESSING_ERROR",
        merchantMessage: "The session was rejected."
      }
    });
    if (response?.userErrors?.length === 0) await this.update?.(id, REJECT);
    return response;
  }

  async pendSession({ id, gid }) {
    if (this.type !== PAYMENT) throw new Error("Cannot pend a session for this client");

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const response = await this.#perform(schema[this.pendingMutation], {
      id: gid,
      pendingExpiresAt: tomorrow.toISOString(),
      reason: "PARTNER_ACTION_REQUIRED"
    });
    if (response?.userErrors?.length === 0) await this.update?.(id, PENDING);
    return response;
  }

  async #perform(query, variables) {
    const apiVersion = "unstable";
    const response = await fetch(`https://${this.shop}/payments_apps/api/${apiVersion}/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': this.accessToken
      },
      body: JSON.stringify({ query, variables })
    });

    const responseBody = await response.json();
    return response.ok ? responseBody.data : null;
  }

  async paymentsAppConfigure(externalHandle, ready) {
    const response = await this.#perform(schema.paymentsAppConfigure, { externalHandle, ready });
    return response?.paymentsAppConfigure;
  }

  dependencyInjector(type) {
    switch(type) {
      case PAYMENT:
        this.resolveMutation = "paymentSessionResolve";
        this.rejectMutation = "paymentSessionReject";
        this.pendingMutation = "paymentSessionPending";
        this.update = updatePaymentSessionStatus;
        break;
      case REFUND:
        this.resolveMutation = "refundSessionResolve";
        this.rejectMutation = "refundSessionReject";
        this.update = updateRefundSessionStatus;
        break;
      case CAPTURE:
        this.resolveMutation = "captureSessionResolve";
        this.rejectMutation = "captureSessionReject";
        this.update = updateCaptureSessionStatus;
        break;
      case VOID:
        this.resolveMutation = "voidSessionResolve";
        this.rejectMutation = "voidSessionReject";
        this.update = updateVoidSessionStatus;
        break;
    }
  }
}

export const PAYMENT = "payment";
export const REFUND = "refund";
export const CAPTURE = "capture";
export const VOID = "void";
