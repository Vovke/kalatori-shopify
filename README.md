# Kalatori BFF

A backend-for-frontend (BFF) library for proxying requests to the Kalatori daemon. This library allows eCommerce platforms to integrate Polkadot-based payments easily within their own Node.js applications.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Functions](#functions)
  - [getHealth](#gethealth)
  - [getStatus](#getstatus)
  - [createOrder](#createorder)
  - [forceWithdrawal](#forcewithdrawal)
  - [getPaymentStatus](#getpaymentstatus)
  - [investigateOrder](#investigateorder)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Developing Locally](#developing-locally)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the `kalatori-bff` package, use npm:

```bash
npm install kalatori-bff
```

## Usage

1. **Configure the environment variables**:

Create a `.env` file in the root of your project and set the following variables:

```env
KALATORI_HOST="http://127.0.0.1:16726"
KALATORI_PORT=3000
```

2. **Use the Kalatori BFF Services in Your Application**:

You can use the `kalatoriService` provided by the `kalatori-bff` library in your Node.js application logic to proxy requests to the Kalatori daemon.

## Functions

### getHealth

**Description**: Checks the health status of the Kalatori daemon.

**Endpoint**: `GET /v2/health`

**Usage**:

This function makes a GET request to the `/v2/health` endpoint of the Kalatori daemon and returns the status of the API and its current version.

```javascript
const health = await kalatoriService.getHealth();
```

### getStatus

**Description**: Retrieves the general configuration and status of the Kalatori daemon.

**Endpoint**: `GET /v2/status`

**Usage**:

This function makes a GET request to the `/v2/status` endpoint of the Kalatori daemon and returns the general configuration and status information.

```javascript
const status = await kalatoriService.getStatus();
```

### createOrder

**Description**: Creates a new order or returns the existing order for a specific order ID.

**Endpoint**: `POST /v2/order/:orderId`

**Usage**:

This function makes a POST request to the `/v2/order/:orderId` endpoint of the Kalatori daemon with the provided order details.

```javascript
const orderId = '12345';
const amount = 100;
const currency = 'USDC';
const callback = 'http://example.com/callback';
const order = await kalatoriService.createOrder(orderId, amount, currency, callback);
```

### forceWithdrawal

**Description**: Forces the withdrawal of the specified order.

**Endpoint**: `POST /v2/order/:orderId/forceWithdrawal`

**Usage**:

This function makes a POST request to the `/v2/order/:orderId/forceWithdrawal` endpoint of the Kalatori daemon to forcefully withdraw the specified order.

```javascript
const orderId = '12345';
const withdrawal = await kalatoriService.forceWithdrawal(orderId);
```

### getPaymentStatus

**Description**: Gets the payment status of an order by the payment account.

**Endpoint**: `POST /public/v2/payment/:paymentAccount`

**Usage**:

This function makes a POST request to the `/public/v2/payment/:paymentAccount` endpoint of the Kalatori daemon to retrieve the payment status of the specified order.

```javascript
const paymentAccount = '5D5zvghAS6Hw';
const paymentStatus = await kalatoriService.getPaymentStatus(paymentAccount);
```

### investigateOrder

**Description**: Investigates the specified order.

**Endpoint**: `POST /v2/order/:orderId/investigate`

**Usage**:

This function makes a POST request to the `/v2/order/:orderId/investigate` endpoint of the Kalatori daemon to investigate the specified order.

```javascript
const orderId = '12345';
const investigation = await kalatoriService.investigateOrder(orderId);
```

## Configuration

The library uses environment variables for configuration. Create a `.env` file in the root of your project with the following content:

```env
KALATORI_HOST="http://127.0.0.1:16726"
KALATORI_PORT=3000
```

- `KALATORI_HOST`: The host URL of the Kalatori daemon.
- `KALATORI_PORT`: The port on which the BFF server will run.

## Running Tests

To run tests for the `kalatori-bff` library, use the following command:

```bash
npm test
```

Ensure that the Kalatori daemon is running locally when running the tests.

## Developing Locally

To develop locally, follow these steps:

1. **Clone the Kalatori backend repository**:

```bash
git clone https://github.com/Alzymologist/Kalatori-backend
cd Kalatori-backend
```

2. **Start the local test network using Chopsticks**:

Use `npx` to run Chopsticks with the preferred configuration:

```bash
npx @acala-network/chopsticks@latest -c chopsticks/pd-ah.yml
```

Or run it directly with the preferred RPC:

```bash
npx @acala-network/chopsticks@latest --endpoint wss://preferred-rpc-endpoint
```

3. **Start the Kalatori daemon locally**:

Run the daemon using the provided `start.sh` script:

```bash
./start.sh
```

Or run it manually with your own configuration:

```bash
KALATORI_HOST="127.0.0.1:16726" \
KALATORI_SEED="your-seed-phrase" \
KALATORI_DATABASE="path-to-database" \
KALATORI_RPC="wss://rpc.polkadot.io" \
KALATORI_DECIMALS="12" \
KALATORI_DESTINATION="your-destination-address" \
kalatori
```

4. **Start developing**:

Ensure the `kalatori-bff` library is properly configured with the `.env` file, and you can start developing your application logic.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests for improvements or new features.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
