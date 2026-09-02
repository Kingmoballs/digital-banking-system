# Digital Banking System

A backend digital banking system built with **Node.js, Express.js, and MongoDB**, integrating with the **NIBSS by Phoenix API** to support fintech onboarding, KYC verification, bank account operations, and interbank transfers.

## 1. Project Overview

This project was developed as a backend engineering assignment to demonstrate the design and implementation of a digital banking system.

The application integrates with the NIBSS by Phoenix API as the external banking infrastructure while using MongoDB to persist application data such as customer and transaction records.

### Core capabilities

* Fintech onboarding through NIBSS
* NIBSS API authentication
* BVN registration and validation
* NIN registration and validation
* Customer bank account creation
* Account name enquiry
* Account balance enquiry
* Retrieve all accounts
* Interbank fund transfers
* Transaction Status Query (TSQ)
* Transaction persistence in MongoDB
* Protected routes using JWT authentication

---

## 2. Technology Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB
* **ODM:** Mongoose
* **HTTP Client:** Axios
* **Authentication:** JWT
* **Environment Configuration:** dotenv
* **Development:** Nodemon

Docker is **not required** for this project. MongoDB is accessed through a MongoDB connection URI.

---

## 3. Architecture

The application follows a **modular monolith** architecture.

```text
src/
│
├── config/
│
├── integrations/
│   └── nibss/
│       ├── nibss.client.js
│       ├── nibss.auth.js
│       ├── nibss.token.js
│       ├── nibss.kyc.js
│       ├── nibss.account.js
│       └── nibss.transfer.js
│
├── middleware/
│
├── modules/
│   ├── Auth/
│   ├── Kyc/
│   ├── Account/
│   ├── Transfer/
│   └── Transaction/
│
├── app.js
└── server.js
```

### Integration Layer

The `integrations/nibss` directory contains the code responsible for communicating with the external NIBSS API.

This keeps external API communication separate from the application's business logic.

### Modules

Each major business capability is organized into its own module containing controllers, services, and routes where applicable.

---

## 4. NIBSS Integration

The application integrates with the NIBSS by Phoenix API.

### Base URL

```text
https://nibssbyphoenix.onrender.com/
```

The base URL is configured through an environment variable rather than being hard-coded throughout the application.

---

## 5. NIBSS Authentication Flow

The application first onboards the fintech:

```http
POST /api/fintech/onboard
```

A successful onboarding response provides:

```json
{
  "apiKey": "...",
  "apiSecret": "...",
  "bankCode": "...",
  "bankName": "..."
}
```

The API key and API secret are stored securely as environment variables.

The application then authenticates with NIBSS:

```http
POST /api/auth/token
```

and receives a JWT access token.

Protected NIBSS endpoints are called using:

```http
Authorization: Bearer <token>
```

The application includes a token manager that caches the access token and requests a new token when the existing token is close to expiry.

---

## 6. KYC Operations

The system integrates with NIBSS for BVN and NIN operations.

### BVN Registration

```http
POST /api/insertBvn
```

Example:

```json
{
  "bvn": "12345678901",
  "firstName": "John",
  "lastName": "Doe",
  "dob": "2000-01-01",
  "phone": "08000000000"
}
```

### NIN Registration

```http
POST /api/insertNin
```

Example:

```json
{
  "nin": "12345678901",
  "firstName": "John",
  "lastName": "Doe",
  "dob": "2000-01-01"
}
```

### BVN Validation

```http
POST /api/validateBvn
```

### NIN Validation

```http
POST /api/validateNin
```

The application uses the NIBSS identity store to validate customer KYC information before account-related operations.

---

## 7. Account Operations

### Create Account

```http
POST /api/account/create
```

Example:

```json
{
  "kycType": "bvn",
  "kycID": "12345678901",
  "dob": "2000-01-01"
}
```

NIBSS generates the account number and associates it with the fintech's assigned bank.

### Name Enquiry

```http
GET /api/account/name-enquiry/:accountNumber
```

This resolves an account number to the registered account name and bank.

### Get All Accounts

```http
GET /api/accounts
```

Returns accounts associated with the authenticated fintech's bank.

### Account Balance

```http
GET /api/account/balance/:accountNumber
```

Returns the current balance for a specific account.

---

## 8. Fund Transfer

Transfers are processed through the NIBSS API.

```http
POST /api/transfer
```

Example:

```json
{
  "from": "1084071287",
  "to": "1087207670",
  "amount": "80000"
}
```

The transfer integration:

1. Obtains a valid NIBSS access token.
2. Sends the transfer request to NIBSS.
3. Receives the transaction response.
4. Persists the transaction in MongoDB after a successful transfer.
5. Returns the transaction information to the client.

A successful response contains a unique transaction ID:

```json
{
  "message": "Transfer successful",
  "transactionId": "TX1776340463722",
  "amount": 80000,
  "from": "1084071287",
  "to": "1087207670",
  "status": "SUCCESS"
}
```

---

## 9. Transaction Status Query

A transaction can be queried using the transaction ID returned by NIBSS.

```http
GET /api/transaction/:transactionId
```

The request requires authentication.

Example:

```text
GET /api/transaction/TX1776340463722
```

The application calls the NIBSS TSQ endpoint and returns the transaction status.

---

## 10. MongoDB

MongoDB is used as the application's persistent data store.

The MongoDB connection string is configured using an environment variable.

Example:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
```

The actual credentials should **never be committed to the repository**.

MongoDB is primarily used to persist application-owned records, including transaction information required by the system.

---

## 11. Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

NIBSS_BASE_URL=https://nibssbyphoenix.onrender.com

NIBSS_API_KEY=your_api_key

NIBSS_API_SECRET=your_api_secret
```

> Do not commit `.env` to GitHub.

A `.env.example` file should be included in the repository instead:

```env
PORT=5000

MONGO_URI=

NIBSS_BASE_URL=https://nibssbyphoenix.onrender.com

NIBSS_API_KEY=

NIBSS_API_SECRET=
```

---

## 12. Installation

Clone the repository and install dependencies:

```bash
npm install
```

Configure the environment variables:

```text
.env
```

Start the development server:

```bash
npm run dev
```

Start the application normally:

```bash
npm start
```

---

## 13. API Flow

The intended NIBSS workflow is:

```text
1. Register BVN/NIN
          ↓
2. Onboard Fintech
          ↓
3. Receive API Key & API Secret
          ↓
4. Authenticate with NIBSS
          ↓
5. Receive JWT
          ↓
6. Create Customer Account
          ↓
7. Perform Name Enquiry
          ↓
8. Validate KYC
          ↓
9. Initiate Transfer
          ↓
10. Receive Transaction ID
          ↓
11. Query Transaction Status
          ↓
12. Check Account Balance
```

---

## 14. Authentication

Protected application routes use authentication middleware where required.

Protected NIBSS requests are authenticated using the JWT obtained through the NIBSS authentication endpoint.

The token is automatically retrieved by the NIBSS integration layer rather than manually passing a token through every service call.

---

## 15. Error Handling

The application handles errors returned by the NIBSS API and exposes useful information during development.

Examples of NIBSS errors include:

* `400 Bad Request` — invalid request or insufficient funds
* `401 Unauthorized` — missing or expired authentication
* `404 Not Found` — requested resource does not exist
* `409 Conflict` — duplicate resource
* `500 Internal Server Error` — external server error

NIBSS integration errors are logged with the HTTP status and response body to make debugging easier.

---

## 16. Testing

The API can be tested using Postman.

The recommended testing sequence is:

```text
Fintech Onboarding
        ↓
Login
        ↓
Register BVN/NIN
        ↓
Validate BVN/NIN
        ↓
Create Account
        ↓
Name Enquiry
        ↓
Get Accounts
        ↓
Check Balance
        ↓
Transfer
        ↓
Transaction Status Query
        ↓
Check Balance Again
```

The final balance check can be used to verify the effect of a successful transfer.

---

## 17. Security Considerations

The project follows basic security practices appropriate to the assignment:

* API credentials are stored in environment variables.
* NIBSS JWT tokens are not hard-coded into application source code.
* Protected NIBSS endpoints use Bearer authentication.
* Sensitive configuration is excluded from version control.
* External API calls use a centralized Axios client.
* External API errors are handled instead of exposing raw application failures to clients.

---

## 18. Project Scope

The implementation intentionally focuses on the requirements of the assignment and the capabilities exposed by the supplied NIBSS API.

The project does **not** attempt to implement a full production banking core or replicate the complete NIBSS infrastructure.

The external NIBSS API remains responsible for:

* Bank assignment
* Account generation
* External account information
* Interbank transfer processing
* Transaction status
* NIBSS identity validation

The application is responsible for integrating these capabilities into a structured digital banking backend and persisting the application's required records.

---

## 19. Conclusion

This project demonstrates the integration of a Node.js/Express.js backend with an external banking API while maintaining application data in MongoDB.

It covers the major banking workflows required by the assignment, including fintech onboarding, authentication, KYC, account management, transfers, transaction tracking, and balance enquiries.
