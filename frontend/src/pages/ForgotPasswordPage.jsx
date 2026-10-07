import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/apiService';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (emailStr) => {
    if (!emailStr) {
      return 'Email is required.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailStr)) {
      return 'Please enter a valid email address.';
    }
    return '';
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');
    setSuccess('');

    const trimmedEmail = email.trim();
    const validationError = validateEmail(trimmedEmail);

    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    const response = await apiService.forgotPassword({
      email: trimmedEmail
    });

    setIsLoading(false);

    if (!response.success && response.error) {
      setError(
        response.error || 'Failed to request password reset. Please try again.'
      );
      return;
    }

    setSuccess(
      response.message ||
        'If an account with that email exists, a password reset link has been sent.'
    );
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
          Forgot Password
        </h1>

        <p
          style={{
            marginBottom: '28px',
            color: '#666'
          }}
        >
          Enter your registered email address and we'll send you a password reset link.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                marginBottom: '7px',
                fontWeight: '600'
              }}
            >
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={email}
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
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <p
          style={{
            marginTop: '24px',
            textAlign: 'center'
          }}
        >
          Remember your password?{' '}
          <Link
            to="/login"
            style={{
              color: '#2563eb',
              fontWeight: '600',
              textDecoration: 'none'
            }}
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
