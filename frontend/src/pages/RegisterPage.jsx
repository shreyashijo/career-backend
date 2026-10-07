import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    setError('');
    setSuccess('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');
    setSuccess('');

    const fullName = formData.fullName.trim();
    const email = formData.email.trim();

    if (!fullName) {
      setError('Full name is required.');
      return;
    }

    if (!email) {
      setError('Email is required.');
      return;
    }

    if (!formData.password) {
      setError('Password is required.');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    const response = await apiService.registerUser({
      fullName,
      email,
      password: formData.password
    });

    setIsLoading(false);

    if (!response.success) {
      setError(
        response.error || 'Registration failed. Please try again.'
      );
      return;
    }

    setSuccess('Registration successful! Redirecting to login...');

    setTimeout(() => {
      navigate('/login');
    }, 1000);
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
          Create Account
        </h1>

        <p style={{ marginBottom: '28px', color: '#666' }}>
          Register to start your career journey.
        </p>

        <form onSubmit={handleSubmit}>

          <div style={{ marginBottom: '18px' }}>
            <label
              htmlFor="fullName"
              style={{
                display: 'block',
                marginBottom: '7px',
                fontWeight: '600'
              }}
            >
              Full Name
            </label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              autoComplete="name"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxSizing: 'border-box'
              }}
            />
          </div>

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

          <div style={{ marginBottom: '18px' }}>
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

            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                autoComplete="new-password"
                style={{
                  flex: 1,
                  padding: '12px',
                  border: '1px solid #ccc',
                  borderRadius: '8px'
                }}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
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

          <div style={{ marginBottom: '20px' }}>
            <label
              htmlFor="confirmPassword"
              style={{
                display: 'block',
                marginBottom: '7px',
                fontWeight: '600'
              }}
            >
              Confirm Password
            </label>

            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                autoComplete="new-password"
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
                  setShowConfirmPassword((prev) => !prev)
                }
                style={{
                  padding: '0 12px',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  background: '#f5f5f5',
                  cursor: 'pointer'
                }}
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
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

          {success && (
            <div
              style={{
                marginBottom: '16px',
                padding: '12px',
                borderRadius: '8px',
                background: '#e8f7e8',
                color: '#176b17'
              }}
            >
              {success}
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
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p
          style={{
            marginTop: '24px',
            textAlign: 'center'
          }}
        >
          Already have an account?{' '}
          <Link to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}