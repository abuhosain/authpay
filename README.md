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
git clone https://github.com/yourusername/authpay.git
cd authpay
```

#### Using NPM

```bash
npm install        # Install dependencies
npm run dev        # Start development server
npm run build      # Build for production
npm start          # Start production server
```

#### Using Yarn

```bash
yarn install       # Install dependencies
yarn dev           # Start development server
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
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
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

#### 👤 GET `/auth/me`

Returns the authenticated user's details.

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Success Response:**

```json
{
  "id": "user_id",
  "username": "abuhosain123",
  "name": "Abu Hosain",
  "email": "abuhosain@example.com",
  "role": "user"
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
  "transaction": {
    "id": "txn_id",
    "userId": "2343434",
    "price": 24324,
    "status": "completed"
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
