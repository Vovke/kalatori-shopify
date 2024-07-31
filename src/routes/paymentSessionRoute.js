const { createPaymentSession } = require('../services/shopifyService');

exports.action = async ({ request }) => {
  const requestBody = await request.json();
  const shopDomain = request.headers.get("shopify-shop-domain");

  const paymentSession = await createPaymentSession({ ...requestBody, shopDomain });

  if (!paymentSession) throw new Response("A PaymentSession couldn't be created.", { status: 500 });

  return { redirect_url: buildRedirectUrl(request, paymentSession.id) };
};

const buildRedirectUrl = (request, id) => {
  return `${request.url.slice(0, request.url.lastIndexOf("/"))}/payment_simulator/${id}`;
};
