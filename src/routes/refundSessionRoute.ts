import { json } from '@remix-run/node';
import { createRefundSession } from '../services/shopifyService';
import { ActionFunction } from '@remix-run/node';

interface RefundSessionParams {
  id: string;
  gid: string;
  amount: number;
  currency: string;
  paymentId: string;
  proposedAt: string;
}

export const action: ActionFunction = async ({ request }) => {
  const requestBody: RefundSessionParams = await request.json();
  const refundSession = await createRefundSession(requestBody);

  if (!refundSession) {
    throw new Response("A RefundSession couldn't be created.", { status: 500 });
  }

  return json(refundSession);
};
