const { json } = require('@remix-run/node');
const { createCaptureSession } = require('../services/shopifyService');

exports.action = async ({ request }) => {
  const requestBody = await request.json();
  const captureSession = await createCaptureSession(requestBody);

  if (!captureSession) {
    throw new Response("A CaptureSession couldn't be created.", { status: 500 });
  }

  return json(captureSession);
};
