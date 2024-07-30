import { createPaymentSession } from '../services/shopifyService';

export const action = async ({ request }) => {
  const requestBody = await request.json();
  const shopDomain = request.headers.get("shopify-shop-domain");

  const paymentSession = await createPaymentSession(createParams(requestBody, shopDomain));

  if (!paymentSession) throw new Response("A PaymentSession couldn't be created.", { status: 500 });

  return { redirect_url: buildRedirectUrl(request, paymentSession.id) };
};

const createParams = (body, shopDomain) => ({
  id: body.id,
  amount: body.amount,
  currency: body.currency,
  callback: body.cancel_url,
  shop: shopDomain,
});

const buildRedirectUrl = (request, id) => {
  return `${request.url.slice(0, request.url.lastIndexOf("/"))}/payment_simulator/${id}`;
};
