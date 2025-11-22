import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');

  /**
   * Fetch all employees from API
   */
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await api.get('/employees');
      setEmployees(res.data || []);
      setError('');
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        setError('Failed to load employees. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Load employees on component mount
   */
  useEffect(() => {
    fetchEmployees();
   }, []);

  /**
   * Handle employee deletion
   */
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) {
      return;
    }

    try {
      await api.delete(`/employees/${id}`);
      setSuccess(`${name} has been deleted successfully`);
      fetchEmployees();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete employee');
    }
  };

  /**
   * Handle logout
   */
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  /**
   * Format salary as currency
   */
  const formatSalary = (salary) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(Number(salary));
};

  return (
  <div className="min-vh-100 bg-light">
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand fw-semibold">Employee Management</span>
        <button
          className="btn btn-outline-light ms-auto"
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>

    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
        <div>
          <h3 className="mb-1">Employees</h3>
          <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
            View, add, edit and delete employee records
          </p>
        </div>

        <Link to="/employees/new" className="mt-3 mt-md-0 text-decoration-none">
          <button className="btn btn-primary">
            + Add New Employee
          </button>
        </Link>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          {error && (
            <div className="alert alert-danger py-2" role="alert">
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success py-2" role="alert">
              {success}
            </div>
          )}

          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary mb-2" role="status" />
              <p className="mb-0">Loading employees...</p>
            </div>
          ) : employees.length === 0 ? (
            <div className="text-center py-4 text-muted">
              <p className="mb-1">No employees found.</p>
              <p className="mb-0">Click &quot;Add New Employee&quot; to get started.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Position</th>
                    <th scope="col">Department</th>
                    <th scope="col" className="text-end">Salary</th>
                    <th scope="col" className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp._id}>
                      <td>{emp.name}</td>
                      <td>{emp.email}</td>
                      <td>{emp.position}</td>
                      <td>{emp.department}</td>
                      <td className="text-end">{formatSalary(emp.salary)}</td>
                      <td className="text-center">
                        <div className="btn-group btn-group-sm" role="group">
                          <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={() => navigate(`/employees/${emp._id}/edit`)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => handleDelete(emp._id, emp.name)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);
};

export default EmployeeList;
