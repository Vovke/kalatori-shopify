import { json } from "@remix-run/node";
import { createVoidSession } from "~/services/shopifyService";
import { ActionFunction } from "@remix-run/node";

interface VoidSessionParams {
  id: string;
  gid: string;
  paymentId: string;
  proposedAt: string;
}

export const action: ActionFunction = async ({ request }) => {
  const requestBody: VoidSessionParams = await request.json();
  const voidSession = await createVoidSession(requestBody);

  if (!voidSession) {
    throw new Response("A VoidSession couldn't be created.", { status: 500 });
  }

  return json(voidSession);
};
