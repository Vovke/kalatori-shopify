import {
  Button,
  Card,
  FooterHelp,
  FormLayout,
  Layout,
  Page,
  Text,
  Select,
  BlockStack,
  Link,
  Banner,
} from "@shopify/polaris";
import { useEffect, useState } from "react";
import { Form, useLoaderData, useActionData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { LoaderFunction, ActionFunction } from "@remix-run/node";
import { getPaymentSession, RESOLVE, REJECT, PENDING } from "~/services/shopifyService";
import PaymentsAppsClient, { PAYMENT } from "~/services/payments-apps.graphql";

interface PaymentSession {
  id: string;
  gid: string;
  group: string;
  amount: number;
  currency: string;
  test: boolean;
  kind: string;
  paymentMethod: string;
  proposedAt: string;
  cancelUrl: string;
  shop: string;
}

export const loader: LoaderFunction = async ({ params }) => {
  const { paymentId } = params;
  const paymentSession = await getPaymentSession(paymentId!);
  return json({ paymentSession });
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const resolution = formData.get("resolution") as string;

  const { paymentId } = params;
  const paymentSession = await getPaymentSession(paymentId!);

  const session = (await sessionStorage.findSessionsByShop(paymentSession.shop))[0];
  const client = new PaymentsAppsClient(session.shop, session.accessToken, PAYMENT);

  let response;
  switch (resolution) {
    case RESOLVE:
      response = await client.resolveSession(paymentSession);
      break;
    case REJECT:
      response = await client.rejectSession(paymentSession);
      break;
    case PENDING:
      response = await client.pendSession(paymentSession);
      break;
  }

  if (response.userErrors?.length > 0) return json({ errors: response.userErrors });

  return redirect(response.paymentSession.nextAction.context.redirectUrl);
};

const PaymentSimulator = () => {
  const action = useActionData();
  const { paymentSession } = useLoaderData<{ paymentSession: PaymentSession }>();
  const [resolution, setResolution] = useState<string>(RESOLVE);
  const [errors, setErrors] = useState<Array<{ message: string }>>([]);

  useEffect(() => {
    if (action?.errors.length > 0) setErrors(action.errors);
  }, [action]);

  const errorBanner = () => (
    errors.length > 0 && (
      <Banner
        title={"😢 An error occurred!"}
        status="critical"
        onDismiss={() => setErrors([])}
      >
        {errors.map(({ message }, idx) => (
          <Text as="p" key={idx}>{message}</Text>
        ))}
      </Banner>
    )
  );

  const resolutionOptions = [
    { value: RESOLVE, label: "Resolve" },
    { value: REJECT, label: "Reject" },
    { value: PENDING, label: "Pending" },
  ];

  return (
    <Page title="Payment Simulator">
      <Layout>
        <Layout.Section>{errorBanner()}</Layout.Section>
        <Layout.Section>
          <Card>
            <Form method="post">
              <FormLayout>
                <Select
                  label="Resolution"
                  name="resolution"
                  options={resolutionOptions}
                  onChange={(value) => setResolution(value)}
                  value={resolution}
                />
                <Button submit>Submit</Button>
              </FormLayout>
            </Form>
          </Card>
        </Layout.Section>
      </Layout>

      <FooterHelp>
        <Text as="span">Learn more about </Text>
        <Link url="https://help.shopify.com/en/api/guides/payment-gateway">payment sessions</Link>
      </FooterHelp>
    </Page>
  );
};

export default PaymentSimulator;
