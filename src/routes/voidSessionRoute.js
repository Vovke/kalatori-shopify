const { json } = require('@remix-run/node');
const { createVoidSession } = require('../services/shopifyService');

exports.action = async ({ request }) => {
  const requestBody = await request.json();
  const voidSession = await createVoidSession(requestBody);

  if (!voidSession) {
    throw new Response("A VoidSession couldn't be created.", { status: 500 });
  }

  return json(voidSession);
};
