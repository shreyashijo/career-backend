import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || '/dashboard';

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');

    const email = formData.email.trim();

    if (!email) {
      setError('Email is required.');
      return;
    }

    if (!formData.password) {
      setError('Password is required.');
      return;
    }

    setIsLoading(true);

    const response = await login({
      email,
      password: formData.password
    });

    setIsLoading(false);

    if (!response.success) {
      setError(
        response.error || 'Invalid email or password.'
      );
      return;
    }

    navigate(from, { replace: true });
  };

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 20px'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          padding: '32px',
          borderRadius: '16px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.10)',
          background: '#ffffff'
        }}
      >
        <h1 style={{ marginBottom: '8px' }}>
          Login
        </h1>

        <p
          style={{
            marginBottom: '28px',
            color: '#666'
          }}
        >
          Login to continue your career journey.
        </p>

        <form onSubmit={handleSubmit}>

          <div style={{ marginBottom: '18px' }}>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                marginBottom: '7px',
                fontWeight: '600'
              }}
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                marginBottom: '7px',
                fontWeight: '600'
              }}
            >
              Password
            </label>

            <div
              style={{
                display: 'flex',
                gap: '8px'
              }}
            >
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                style={{
                  flex: 1,
                  padding: '12px',
                  border: '1px solid #ccc',
                  borderRadius: '8px'
                }}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                style={{
                  padding: '0 12px',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  background: '#f5f5f5',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div
            style={{
              textAlign: 'right',
              marginBottom: '20px'
            }}
          >
            <Link
              to="/forgot-password"
              style={{
                color: '#2563eb',
                textDecoration: 'none'
              }}
            >
              Forgot password?
            </Link>
          </div>

          {error && (
            <div
              style={{
                marginBottom: '16px',
                padding: '12px',
                borderRadius: '8px',
                background: '#ffe8e8',
                color: '#b00020'
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '13px',
              border: 'none',
              borderRadius: '8px',
              background: '#2563eb',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isLoading
                ? 'not-allowed'
                : 'pointer',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p
          style={{
            marginTop: '24px',
            textAlign: 'center'
          }}
        >
          Don't have an account?{' '}
          <Link to="/register">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}