import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';


const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
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
    setError(''); // Clear error on input change
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!form.email || !form.password) {
      setError('Email and password are required');
      return;
    }

    if (!isValidEmail(form.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const res = await api.post('/auth/login', {
        email: form.email.toLowerCase(),
        password: form.password,
      });

      localStorage.setItem('token', res.data.token);
      navigate('/employees');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
  <div
    className="min-vh-100 d-flex align-items-center justify-content-center"
    style={{
      backgroundImage:
        'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.pexels.com/photos/2706379/pexels-photo-2706379.jpeg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  >
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-11 col-sm-8 col-md-6 col-lg-4">
          <div
            className="card border-0 shadow-lg"
            style={{ borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.92)' }}
          >
            <div className="card-body p-4 p-md-5">
              <h2 className="text-center mb-2" style={{ fontWeight: 600 }}>
                Admin Login
              </h2>
              <p className="text-center text-muted mb-4" style={{ fontSize: '0.95rem' }}>
                Secure access to the Employee Management System
              </p>

              {error && (
                <div className="alert alert-danger py-2" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="form-control form-control-lg"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="admin@example.com"
                    disabled={loading}
                    autoFocus
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="form-control form-control-lg"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    disabled={loading}
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <small className="text-muted">Minimum 6 characters</small>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 btn-lg"
                  style={{ borderRadius: '999px' }}
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>

              <p
                className="text-center text-muted mt-4 mb-0"
                style={{ fontSize: '0.85rem', lineHeight: 1.4 }}
              >
                Demo Credentials<br />
                Email: admin@example.com<br />
                Password: khushal1132
              </p>
            </div>
          </div>

          <p className="text-center text-light mt-3" style={{ fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} Employee Management System
          </p>
        </div>
      </div>
    </div>
  </div>
);
};

export default Login;
