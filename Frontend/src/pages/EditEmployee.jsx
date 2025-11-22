import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const EditEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    salary: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  /**
   * Validate email format
   */
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  /**
   * Fetch employee data
   */
  const fetchEmployee = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/employees/${id}`);
      setForm({
        name: res.data.name || '',
        email: res.data.email || '',
        position: res.data.position || '',
        department: res.data.department || '',
        salary: res.data.salary || '',
      });
      setError('');
    } catch {
      setError('Failed to load employee. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
    }, [id]);

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

    setSubmitting(true);

    try {
      await api.put(`/employees/${id}`, {
        name: form.name.trim(),
        email: form.email.toLowerCase().trim(),
        position: form.position.trim(),
        department: form.department.trim(),
        salary: Number(form.salary),
      });
      navigate('/employees');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update employee. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  /**
   * Handle cancel
   */
  const handleCancel = () => {
    navigate('/employees');
  };

  if (loading) {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="text-center">
        <div className="spinner-border text-primary mb-3" role="status" />
        <p className="mb-0">Loading employee details...</p>
      </div>
    </div>
  );
}


  return (
  <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-11 col-sm-10 col-md-8 col-lg-6">
          <div className="card shadow-lg border-0">
            <div className="card-body p-4 p-md-5">
              <h3 className="mb-2 text-center">Edit Employee</h3>
              <p className="text-center text-muted mb-4" style={{ fontSize: '0.9rem' }}>
                Update the employee details and click &quot;Update Employee&quot; to save changes.
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
                    disabled={submitting}
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
                    disabled={submitting}
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
                    placeholder="e.g., Full Stack Developer"
                    disabled={submitting}
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
                    disabled={submitting}
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
                    disabled={submitting}
                    min="0"
                    step="1000"
                  />
                </div>

                <div className="d-flex flex-column flex-sm-row gap-2 mt-3">
                  <button
                    type="submit"
                    className="btn btn-primary flex-fill"
                    disabled={submitting}
                  >
                    {submitting ? 'Updating...' : 'Update Employee'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary flex-fill"
                    onClick={handleCancel}
                    disabled={submitting}
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

export default EditEmployee;
