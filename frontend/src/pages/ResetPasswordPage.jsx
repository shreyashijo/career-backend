import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { apiService } from '../services/apiService';

export default function ResetPasswordPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const [formData, setFormData] = useState({
    newPassword: '',
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

    if (!token || !token.trim()) {
      setError('Invalid or missing password reset link. Please request a new link.');
      return;
    }

    if (!formData.newPassword) {
      setError('New password is required.');
      return;
    }

    if (formData.newPassword.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    const response = await apiService.resetPassword(
      token.trim(),
      formData.newPassword
    );

    setIsLoading(false);

    if (!response.success) {
      setError(
        response.error || 'Invalid or expired password reset token.'
      );
      return;
    }

    setSuccess(
      response.message || 'Password has been reset successfully. You can now login with your new password.'
    );
  };

  const isInvalidToken = !token || !token.trim();

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
          Reset Password
        </h1>

        <p
          style={{
            marginBottom: '28px',
            color: '#666'
          }}
        >
          Enter your new password below to reset your account password.
        </p>

        {isInvalidToken ? (
          <div>
            <div
              style={{
                marginBottom: '20px',
                padding: '12px',
                borderRadius: '8px',
                background: '#ffe8e8',
                color: '#b00020'
              }}
            >
              Invalid or missing password reset link. Please request a new link.
            </div>

            <p style={{ textAlign: 'center' }}>
              <Link
                to="/forgot-password"
                style={{
                  color: '#2563eb',
                  fontWeight: '600',
                  textDecoration: 'none'
                }}
              >
                Request a new password reset link
              </Link>
            </p>
          </div>
        ) : success ? (
          <div>
            <div
              style={{
                marginBottom: '24px',
                padding: '16px',
                borderRadius: '8px',
                background: '#e8f7e8',
                color: '#176b17',
                fontWeight: '500'
              }}
            >
              {success}
            </div>

            <p style={{ textAlign: 'center' }}>
              <Link
                to="/login"
                style={{
                  display: 'inline-block',
                  width: '100%',
                  padding: '13px',
                  borderRadius: '8px',
                  background: '#2563eb',
                  color: '#ffffff',
                  fontSize: '16px',
                  fontWeight: '600',
                  textAlign: 'center',
                  textDecoration: 'none',
                  boxSizing: 'border-box'
                }}
              >
                Proceed to Login
              </Link>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '18px' }}>
              <label
                htmlFor="newPassword"
                style={{
                  display: 'block',
                  marginBottom: '7px',
                  fontWeight: '600'
                }}
              >
                New Password
              </label>

              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.newPassword}
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
                Confirm New Password
              </label>

              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter new password"
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
              <div>
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

                {error.includes('expired') || error.includes('Invalid') ? (
                  <p style={{ marginBottom: '16px', textAlign: 'center' }}>
                    <Link
                      to="/forgot-password"
                      style={{
                        color: '#2563eb',
                        fontWeight: '600',
                        textDecoration: 'none'
                      }}
                    >
                      Request a new password reset link
                    </Link>
                  </p>
                ) : null}
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
              {isLoading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>
        )}

        {!success && !isInvalidToken && (
          <p
            style={{
              marginTop: '24px',
              textAlign: 'center'
            }}
          >
            Remembered your password?{' '}
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
        )}
      </div>
    </div>
  );
}
