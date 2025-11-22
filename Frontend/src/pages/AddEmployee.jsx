import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AddEmployee = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    salary: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Validate email format
   */
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  /**
   * Handle input change
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!form.name.trim()) {
      setError('Name is required');
      return;
    }

    if (form.name.trim().length < 2) {
      setError('Name must be at least 2 characters');
      return;
    }

    if (!form.email.trim()) {
      setError('Email is required');
      return;
    }

    if (!isValidEmail(form.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!form.position.trim()) {
      setError('Position is required');
      return;
    }

    if (!form.department.trim()) {
      setError('Department is required');
      return;
    }

    if (form.salary === '' || form.salary === null) {
      setError('Salary is required');
      return;
    }

    if (Number(form.salary) < 0) {
      setError('Salary must be a positive number');
      return;
    }

    if (Number(form.salary) > 999999999) {
      setError('Salary value is too high');
      return;
    }

    setLoading(true);

    try {
      await api.post('/employees', {
        name: form.name.trim(),
        email: form.email.toLowerCase().trim(),
        position: form.position.trim(),
        department: form.department.trim(),
        salary: Number(form.salary),
      });
      navigate('/employees');
    } catch (err) {
      if (err.response?.status === 400 && err.response?.data?.message?.includes('already exists')) {
        setError('An employee with this email already exists');
      } else {
        setError(err.response?.data?.message || 'Failed to add employee. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle cancel
   */
  const handleCancel = () => {
    navigate('/employees');
  };

 return (
  <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-11 col-sm-10 col-md-8 col-lg-6">
          <div className="card shadow-lg border-0">
            <div className="card-body p-4 p-md-5">
              <h3 className="mb-2 text-center">Add New Employee</h3>
              <p className="text-center text-muted mb-4" style={{ fontSize: '0.9rem' }}>
                Fill in the details below to create a new employee record.
              </p>

              {error && (
                <div className="alert alert-danger py-2" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    className="form-control"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g., Khushal Singh"
                    disabled={loading}
                    autoFocus
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="form-control"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="e.g., khushal@example.com"
                    disabled={loading}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="position" className="form-label">
                    Position *
                  </label>
                  <input
                    id="position"
                    type="text"
                    name="position"
                    className="form-control"
                    value={form.position}
                    onChange={handleChange}
                    placeholder="e.g., full stack developer"
                    disabled={loading}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="department" className="form-label">
                    Department *
                  </label>
                  <input
                    id="department"
                    type="text"
                    name="department"
                    className="form-control"
                    value={form.department}
                    onChange={handleChange}
                    placeholder="e.g., Engineering"
                    disabled={loading}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="salary" className="form-label">
                    Salary (₹) *
                  </label>
                  <input
                    id="salary"
                    type="number"
                    name="salary"
                    className="form-control"
                    value={form.salary}
                    onChange={handleChange}
                    placeholder="e.g., 75000"
                    disabled={loading}
                    min="0"
                    step="1000"
                  />
                </div>

                <div className="d-flex flex-column flex-sm-row gap-2 mt-3">
                  <button
                    type="submit"
                    className="btn btn-success flex-fill"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Employee'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary flex-fill"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </div>
              </form>

              <p className="text-muted mt-3 mb-0" style={{ fontSize: '0.85rem' }}>
                * All fields are required
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default AddEmployee;
