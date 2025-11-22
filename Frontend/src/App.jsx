import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import EmployeeList from './pages/EmployeeList.jsx';
import AddEmployee from './pages/AddEmployee.jsx';
import EditEmployee from './pages/EditEmployee.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <EmployeeList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees/new"
          element={
            <ProtectedRoute>
              <AddEmployee />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees/:id/edit"
          element={
            <ProtectedRoute>
              <EditEmployee />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/employees" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
