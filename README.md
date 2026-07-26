# BACKEND API TEST


![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)

![Express](https://img.shields.io/badge/Express-5.x-black?logo=express)

![MongoDB](https://img.shields.io/badge/MongoDB-8.x-47A248?logo=mongodb&logoColor=white)

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)

![License](https://img.shields.io/badge/license-MIT-blue)

# Eng Description

A RESTful backend API developed with **Node.js**, **Express.js**, **TypeScript**, and **MongoDB**.

This project provides authentication using JWT, product catalog management, and product quotation management.

---

# Esp Description

Un Backend con API & Restful desarrollado con **Node.js**, **Express.js**, **Typescript**, y **MongoDB**
El proyecto provee autenticacion utilizando JWT, el manejo de catalogo de productos, y manejo de cotizaciones

---

# Technologies

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Morgan
- dotenv

# Features

- JWT Authentication
- Password hashing with bcrypt
- MongoDB integration using Mongoose
- CRUD operations
- RESTful API
- TypeScript support
- Environment configuration with dotenv
- Request logging using Morgan

---

# Project Structure

```
src
│
├── config/
├── controllers/
├── interfaces/
├── middleware/
├── models/
├── routes/
├── server.ts
└── index.ts
```

---

# Requirements

Before running the project, make sure you have installed:

- Node.js 20+ (or newer)
- MongoDB Community Server, MongoDB Compass or MongoDB Atlas
- Git
- Insomnia or Postman for CURL Testing

---

# Installation

Clone the repository

```bash
git https://github.com/ErickCarrasco/Backend_Api_Rest_Test.git
```

Enter the project

```bash
cd Backend_Api_Rest_Test
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a file named:

```
.env
```

Example:

```env
PORT=4000

MONGODB_URL=mongodb://127.0.0.1:27017/product_request_db

JWT_SECRET=your_secret_key

MORGAN_DEV=dev
```

---

# Running MongoDB

If using MongoDB Community Edition or MongoDB Compass, make sure the MongoDB service is running.

Default local connection:

```
mongodb://127.0.0.1:27017/product_request_db
```

If using MongoDB Atlas, replace the URL with your cluster connection string.

---

# Running the Project

Development mode

```bash
npm run dev
```

Production build

```bash
npm run build
```

Run compiled project

```bash
npm start
```

---

# API Base URL

```
http://localhost:4000/api
```

---

# Authentication

The API uses JWT Bearer Tokens.

Authenticate first:

```
POST /api/user/login/email (Test with email only)
POST /api/user/login/id (Test with ID only)
POST /api/user/login/general (General Purpose login)
```

The response returns:

```json
{
    "status": "status",
    "info": "information about endpoint",
    "token": "JWT_TOKEN",
    "user": "user_object_data"
}
```

Use the token in subsequent requests:

```
AuthorizationApp: YOUR_TOKEN
```

---

# Endpoints

## User

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/user/create/user/email | Create user (testing purposes) |
| POST | /api/user/login/email | Login |
| POST | /api/user/login/id | Login |
| POST | /api/user/login/general | Login |
| POST | /api/user/change/password | Password change if needed |
| GET | /api/user/one | Get current user logged |
| GET | /api/user/logout | current user logs out |
| DELETE | /api/user/lowuser | Deletes current user & sets all quotations as inactive |
---

## Products / Safety products for vehicles

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/product/get/available | Lists products that have isActive flag true |

---

## Quotations

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/quotation/create | Create quotation |
---

# Testing with Insomnia

1. Create a user.

```
POST /api/user/create/user/email
```

```
Required Fields in the body
│
├── name
├── email
└── password

Optional Field
│
└── id
```

This will generate an auth token so the user log ins immediately


2. Login.

```
POST /api/user/login/email
```

```
Required Fields in the body
│
├── email
└── password

```

This will generate an auth token so the user gets logged in

3. Copy the returned JWT token.

4. In Insomnia:

```
Headers
↓
Create a header called: AuthorizationApp
```

Paste the JWT.

5. Access protected routes.

6. Access available products.

```
GET /api/product/get/available
```


```
Required Headers
│
└── AuthorizationApp

```

```
Required Params
│
└── queryPage

```

7. Create a Quotation

```
POST /api/product/get/available
```

```
Required Headers
│
└── AuthorizationApp

```

```
Required Fields in the body
│
├── vehicle
├── yearVehicle
├── conditions
├── typeCover
└── modelVehicle
```

---

# Sample Product JSON

```json
{
    "_id": {
    "$oid": "6a653b5fb42fd614e27f05fd"
    },
    "name": "GPS Tracker",
    "typeCover": "satellite",
    "description": "A high precision GPS tracker for vehicles and personal use.",
    "sku": "MOU-001",
    "price": 49.99,
    "stock": 25,
    "category": "Peripherals",
    "conditions": "New",
    "isActive": true
}
```

---

# Author

Erick Carrasco