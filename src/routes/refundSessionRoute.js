const { json } = require('@remix-run/node');
const { createRefundSession } = require('../services/shopifyService');

exports.action = async ({ request }) => {
  const requestBody = await request.json();
  const refundSession = await createRefundSession(requestBody);

  if (!refundSession) {
    throw new Response("A RefundSession couldn't be created.", { status: 500 });
  }

  return json(refundSession);
};
