# 👔 Employee Management System

A full-stack web application for managing employee records, with admin authentication and CRUD operations for employees.

---

## 🚀 How to Open and Start

### **Step 1: Backend Setup** (Terminal 1)
```bash
cd Backend
npm install
npm run dev
```

Expected output: `Server running on port 5000`

### **Step 2: Frontend Setup** (Terminal 2)
```bash
cd Frontend
npm install
npm run dev
```

Expected output: `Local: http://localhost:5173/`

### **Step 3: Open in Browser**
```
http://localhost:5173
```

### **Step 4: Login**
Default admin credentials:
- **Email:** admin@example.com
- **Password:** admin123

---

## 📋 Project Summary

### **What It Does**

This is an Employee Management System where admins can:
- Login securely with JWT authentication
- View all employees in a database
- Add new employee records with details
- Edit existing employee information
- Delete employee records
- Manage employee data (name, email, position, department, salary)

### **Tech Stack**

**Backend:**
- Express.js - Web framework
- MongoDB - Database
- Mongoose - ODM
- JWT - Secure authentication
- bcryptjs - Password hashing
- CORS - Cross-origin requests

**Frontend:**
- React 19 - UI framework
- Vite - Build tool
- Bootstrap 5 - Styling
- React Router - Navigation
- Axios - HTTP requests

### **Key Features**

✅ Admin Login & Authentication
✅ Employee CRUD Operations
✅ Secure JWT Tokens
✅ Password Hashing
✅ MongoDB Database
✅ Responsive Bootstrap UI
✅ Form Validation
✅ Error Handling
✅ Admin Account Creation Script

### **Database Models**

**Admin Model:**
- Email (unique)
- Password (hashed)

**Employee Model:**
- Name
- Email (unique)
- Position
- Department
- Salary
- Timestamps (createdAt, updatedAt)

### **API Endpoints**

```
Authentication:
  POST /api/auth/login        - Admin login
  POST /api/auth/register     - Admin registration

Employees:
  GET  /api/employees         - Get all employees
  GET  /api/employees/:id     - Get single employee
  POST /api/employees         - Create new employee
  PUT  /api/employees/:id     - Update employee
  DELETE /api/employees/:id   - Delete employee
```

### **Folder Structure**

```
Backend/
├── model/              MongoDB schemas (Admin, Employee)
├── route/              API routes (auth, employees)
├── middleware/         Authentication & error handling
├── server.js           Express server entry point
├── createAdmin.js      Admin account creation script
└── .env                Environment variables

Frontend/
├── src/
│   ├── pages/          Login, Employee List, Add, Edit pages
│   ├── components/     Reusable React components
│   ├── services/       API service calls
│   ├── App.jsx         Main component with routing
│   └── main.jsx        React entry point
├── index.html
└── vite.config.js
```

### **Setup Configuration**

**Backend .env file:**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/employee_management
JWT_SECRET=your_jwt_secret_key
```

**Frontend .env file:**
```
VITE_API_URL=http://localhost:5000
```

### **User Flow**

1. **Login** → Admin enters credentials
2. **Dashboard** → View all employees
3. **Add Employee** → Create new employee record
4. **View Details** → See employee information
5. **Edit** → Update employee data
6. **Delete** → Remove employee from system

### **How to Create Admin Account**

Run this command in Backend folder:
```bash
node createAdmin.js
```
Enter your desired email and password when prompted.

---

## ⚙️ Prerequisites

- Node.js 16+
- MongoDB (local or cloud)
- npm or yarn

---

## 💡 Features

- **Secure Authentication** - JWT tokens for secure login
- **CRUD Operations** - Full employee data management
- **Form Validation** - Input validation on both frontend and backend
- **Responsive Design** - Works on desktop and mobile
- **Error Handling** - Comprehensive error messages
- **Session Management** - Auto-logout on token expiry

---

## 🎯 Next Steps

1. Ensure MongoDB is running
2. Start Backend (Terminal 1)
3. Start Frontend (Terminal 2)
4. Create admin account with `node createAdmin.js`
5. Login and start managing employees!

---

**Ready to manage employees? Start the servers and login! 👔**
