import { json } from '@remix-run/node';
import { createCaptureSession } from '../services/shopifyService';
import { ActionFunction } from '@remix-run/node';

interface CaptureSessionParams {
  id: string;
  gid: string;
  amount: number;
  currency: string;
  paymentId: string;
  proposedAt: string;
}

export const action: ActionFunction = async ({ request }) => {
  const requestBody: CaptureSessionParams = await request.json();
  const captureSession = await createCaptureSession(requestBody);

  if (!captureSession) {
    throw new Response("A CaptureSession couldn't be created.", { status: 500 });
  }

  return json(captureSession);
};
