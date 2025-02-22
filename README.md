# API Documentation - Authentication

## Base URL
```
http://your-api-url.com/api/auth
```

## Endpoints

### 1. Register User
**Endpoint:**
```
POST /register
```
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "gender": "male",
  "role": "admin_toko"
}
```
**Response:**
```json
{
  "success": true,
  "message": "User Created",
  "data": { ... }
}
```

---

### 2. Login as Super Admin
**Endpoint:**
```
POST /login/superadmin
```
**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "securepassword"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Super Admin Login",
  "data": { "token": "jwt-token" }
}
```

---

### 3. Login as Owner
**Endpoint:**
```
POST /login/owner
```
**Request Body:**
```json
{
  "email": "owner@example.com",
  "password": "securepassword"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Owner Login",
  "data": { "token": "jwt-token" }
}
```

---

### 4. Login as Admin
**Endpoint:**
```
POST /login/admin
```
**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "securepassword"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Admin Login",
  "data": { "token": "jwt-token" }
}
```

---

### 5. Login as Kasir
**Endpoint:**
```
POST /login/kasir
```
**Request Body:**
```json
{
  "email": "kasir@example.com",
  "password": "securepassword"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Kasir Login",
  "data": { "token": "jwt-token" }
}
```

---

### 6. Refresh Token
**Endpoint:**
```
POST /refresh
```
**Request Body:**
```json
{
  "refreshToken": "existing-refresh-token"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Token berhasil diperbarui",
  "data": { "token": "new-jwt-token" }
}
```

---

### 7. Logout
**Endpoint:**
```
POST /logout
```
**Headers:**
```
Authorization: Bearer <jwt-token>
```
**Response:**
```json
{
  "success": true,
  "message": "Logout berhasil",
  "data": {}
}
```

---

## Notes
- Semua request login akan mengembalikan token yang harus digunakan untuk autentikasi dalam endpoint lain.
- Pastikan menggunakan **Bearer Token** dalam header untuk endpoint yang memerlukannya.
- Pastikan role user sesuai dengan endpoint login yang digunakan.

