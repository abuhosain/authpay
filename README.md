# AuthPay 🔐💳

A secure authentication and payment processing API that provides user registration, login, profile management, and payment simulation.

---

## 🚀 Features

- User registration with password hashing
- JWT-based authentication
- Protected routes for authenticated users
- Role-based access (user/admin)
- Simulated payments with transaction tracking

---

## 📁 Table of Contents

- [Installation](#installation)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Payments](#payments)

---

## ⚙️ Installation

### 🔑 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)

### 📦 Clone and Setup

```bash
git clone https://github.com/abuhosain/authpay.git
cd authpay
```

#### Using NPM

```bash
npm install        # Install dependencies
npm run start:dev        # Start development server
npm run build      # Build for production
npm start          # Start production server
```

#### Using Yarn

```bash
yarn install       # Install dependencies
yarn start:dev           # Start development server
yarn build         # Build for production
yarn start         # Start production server
```

---

## 📄 API Documentation

### 🔐 Authentication

---

#### ✅ POST `/auth/register`

Registers a new user.

**Request Body:**

```json
{
  "username": "abuhosain123",
  "name": "Abu Hosain",
  "email": "abuhosain@example.com",
  "password": "securePass123",
  "role": "user"  // or "admin"
}
```

**Success Response:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "username": "abuhosain123",
    "name": "Abu Hosain",
    "email": "abuhosain@example.com",
    "role": "user"
  }
}
```

---

#### 🔓 POST `/auth/login`

Logs in an existing user.

**Request Body:**

```json
{
  "email": "abuhosain@example.com",
  "password": "securePass123"
}
```

**Success Response:**

```json
{
   "statusCode": 200,
    "success": true,
    "message": "User is logged succesfully",
    "data": {
        "needsPasswordChange": true,
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZmVjMTRlNjBjMDVlZj 2ZJLlU3rGL0pzfMCH9orFA",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZmVjMTRlNjBjMDVlZjhiNTQ2YTc0O -W_9ZXwuL-l4M"
    }
}
```

---

#### 👤 GET `/auth/me`

Returns the authenticated user's details.

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Success Response:**

```json
{
   "statusCode": 200,
    "success": true,
    "message": "User fetched Successfully",
    "data": {
        "needsPasswordChange": true,
        "_id": "67fec14e60c05ef8b546a749",
        "name": "Abu Hosain",
        "email": "abuhosain@example.com",
        "role": "user",
        "username": "abuhosain123",
        "isBlocked": false,
        "isDeleted": false,
        "createdAt": "2025-04-15T20:27:58.282Z",
        "updatedAt": "2025-04-15T20:27:58.282Z"
    }
}
```

---

### 💳 Payments

---

#### 🧾 POST `/payments/checkout`

Simulates a payment and stores transaction info.

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**

```json
{
  "userId": "2343434", // optional if user is taken from token
  "price": 24324
}
```

**Success Response:**

```json
{
  "success": true,
  "message": "Payment processed successfully",
  "data": {
        "result": "true",
        "payment_url": "https://sandbox.aamarpay.com/paynow.php?track=AAM1744805991271580"
    }
}
```

---

## 🧠 Usage Summary

| Method | Endpoint              | Description                        | Auth Required |
|--------|-----------------------|------------------------------------|---------------|
| POST   | `/auth/register`      | Register a new user                | ❌ No          |
| POST   | `/auth/login`         | Login and receive JWT              | ❌ No          |
| GET    | `/auth/me`            | Get current user profile           | ✅ Yes         |
| POST   | `/payments/checkout`  | Simulate a payment                 | ✅ Yes         |

---

## 🧑‍💻 Author

**Abu Hosain**  
Full Stack Developer | Software Engineer  
🔗 [GitHub](https://github.com/abuhosain) | 🌐 [Portfolio](https://abuhosain.com)

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
