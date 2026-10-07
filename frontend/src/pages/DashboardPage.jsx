import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/apiService';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchDashboard = async () => {
      setIsLoading(true);
      setErrorMessage('');
      const res = await apiService.getDashboard();

      if (isMounted) {
        if (res.success && res.data) {
          setDashboardData(res.data);
        } else {
          setErrorMessage(res.error || 'Failed to load dashboard metrics.');
        }
        setIsLoading(false);
      }
    };

    fetchDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px'
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '4px solid #e2e8f0',
            borderTopColor: '#2563eb',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}
        />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Loading your dashboard...</p>
      </div>
    );
  }

  const data = dashboardData || {
    name: user?.fullName || 'Student',
    email: user?.email || '',
    profileCompletionStatus: 'INCOMPLETE',
    skillsCount: 0,
    interestsCount: 0,
    assessmentCompletionStatus: 'INCOMPLETE',
    recommendedCareer: 'Cybersecurity Analyst',
    roadmapProgressPercentage: 0,
    completedMilestoneCount: 0,
    totalMilestoneCount: 4
  };

  const isProfileComplete = data.profileCompletionStatus === 'COMPLETE';
  const isAssessmentComplete = data.assessmentCompletionStatus && data.assessmentCompletionStatus.startsWith('COMPLETE');

  return (
    <div style={{ padding: '40px 0 80px 0', minHeight: '80vh' }}>
      <div className="container">
        
        {/* Error Alert */}
        {errorMessage && (
          <div
            style={{
              marginBottom: '20px',
              padding: '14px 20px',
              borderRadius: '10px',
              background: '#fee2e2',
              color: '#991b1b',
              border: '1px solid #fca5a5'
            }}
          >
            ⚠️ {errorMessage}
          </div>
        )}

        {/* Welcome Header */}
        <div className="card" style={{ marginBottom: '28px', padding: '32px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="badge badge-blue" style={{ marginBottom: '8px' }}>
                Student Dashboard
              </span>
              <h1 style={{ fontSize: '2.2rem', color: '#0b192c', marginTop: '4px', marginBottom: '6px' }}>
                Welcome back, <span style={{ color: '#2563eb' }}>{data.name}</span> 👋
              </h1>
              <p style={{ color: '#64748b', fontSize: '1rem', margin: 0 }}>
                📧 {data.email}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <span
                style={{
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  fontSize: '0.88rem',
                  fontWeight: '700',
                  background: isProfileComplete ? '#dcfce7' : '#fef3c7',
                  color: isProfileComplete ? '#166534' : '#92400e',
                  border: isProfileComplete ? '1px solid #86efac' : '1px solid #fcd34d'
                }}
              >
                Profile: {data.profileCompletionStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Core Metrics Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            marginBottom: '32px'
          }}
        >
          {/* Card 1: Profile */}
          <div className="card card-interactive" style={{ padding: '24px' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>👤</div>
            <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
              Profile Status
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: isProfileComplete ? '#16a34a' : '#d97706', margin: '4px 0 12px 0' }}>
              {data.profileCompletionStatus}
            </div>
            <Link to="/profile" style={{ fontSize: '0.88rem', fontWeight: '600', color: '#2563eb', textDecoration: 'none' }}>
              Edit Profile →
            </Link>
          </div>

          {/* Card 2: Skills */}
          <div className="card card-interactive" style={{ padding: '24px' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>💡</div>
            <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
              Selected Skills
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#2563eb', margin: '4px 0 12px 0' }}>
              {data.skillsCount}
            </div>
            <Link to="/skills" style={{ fontSize: '0.88rem', fontWeight: '600', color: '#2563eb', textDecoration: 'none' }}>
              Manage Skills →
            </Link>
          </div>

          {/* Card 3: Interests */}
          <div className="card card-interactive" style={{ padding: '24px' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>🎯</div>
            <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
              Selected Interests
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#7c3aed', margin: '4px 0 12px 0' }}>
              {data.interestsCount}
            </div>
            <Link to="/interests" style={{ fontSize: '0.88rem', fontWeight: '600', color: '#2563eb', textDecoration: 'none' }}>
              Manage Interests →
            </Link>
          </div>

          {/* Card 4: Assessment */}
          <div className="card card-interactive" style={{ padding: '24px' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>📝</div>
            <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
              Assessment Evaluation
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: isAssessmentComplete ? '#16a34a' : '#0284c7', margin: '4px 0 12px 0' }}>
              {data.assessmentCompletionStatus}
            </div>
            <Link to="/assessment" style={{ fontSize: '0.88rem', fontWeight: '600', color: '#2563eb', textDecoration: 'none' }}>
              Take Assessment →
            </Link>
          </div>
        </div>

        {/* Recommended Career & Roadmap Hero Banner */}
        <div
          className="card"
          style={{
            padding: '32px',
            marginBottom: '32px',
            borderLeft: data.roadmapStarted ? '6px solid #2563eb' : '6px solid #94a3b8',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
          }}
        >
          {data.roadmapStarted ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <span className="badge badge-emerald" style={{ marginBottom: '10px' }}>
                    Top Career Recommendation
                  </span>
                  <h2 style={{ fontSize: '1.9rem', color: '#0b192c', marginBottom: '8px' }}>
                    {data.recommendedCareer}
                  </h2>
                  <p style={{ color: '#64748b', fontSize: '0.98rem', maxWidth: '560px' }}>
                    Based on your evaluated profile, skills, and diagnostic evaluation score.
                  </p>

                  {/* Progress Summary Pill */}
                  <div style={{ display: 'flex', gap: '16px', marginTop: '20px', flexWrap: 'wrap' }}>
                    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '10px 16px', borderRadius: '10px' }}>
                      <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', display: 'block' }}>
                        Milestones Completed
                      </span>
                      <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0b192c' }}>
                        {data.completedMilestoneCount} / {data.totalMilestoneCount}
                      </span>
                    </div>

                    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '10px 16px', borderRadius: '10px' }}>
                      <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', display: 'block' }}>
                        Overall Progress
                      </span>
                      <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#2563eb' }}>
                        {data.roadmapProgressPercentage}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '220px' }}>
                  <Link to="/roadmap" className="btn btn-primary btn-lg" style={{ textAlign: 'center' }}>
                    Continue Roadmap →
                  </Link>
                  <Link to="/results" className="btn btn-secondary" style={{ textAlign: 'center' }}>
                    View Recommendation →
                  </Link>
                </div>
              </div>

              {/* Overall Roadmap Progress Bar */}
              <div style={{ marginTop: '24px', height: '12px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${data.roadmapProgressPercentage}%`,
                    background: 'linear-gradient(90deg, #2563eb, #00d2ff)',
                    transition: 'width 0.4s ease'
                  }}
                />
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              <div style={{ flex: 1, minWidth: '280px' }}>
                <span className="badge badge-blue" style={{ marginBottom: '10px' }}>
                  Career Roadmap Not Started
                </span>
                <h2 style={{ fontSize: '1.9rem', color: '#0b192c', marginBottom: '8px' }}>
                  Career Roadmap Not Started
                </h2>
                <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '560px', margin: 0 }}>
                  Complete your assessment and view your recommendation to start your roadmap.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '220px' }}>
                <Link to="/results" className="btn btn-primary btn-lg" style={{ textAlign: 'center' }}>
                  View Recommendation →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Quick Shortcut Navigation */}
        <div className="card" style={{ padding: '24px 32px' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#0b192c', marginBottom: '16px' }}>
            Quick Shortcuts
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/profile" className="btn btn-secondary btn-sm">
              ✏️ Profile Information
            </Link>
            <Link to="/skills" className="btn btn-secondary btn-sm">
              💻 Technical Skills
            </Link>
            <Link to="/interests" className="btn btn-secondary btn-sm">
              💡 Career Interests
            </Link>
            <Link to="/assessment" className="btn btn-secondary btn-sm">
              📝 15-Point Assessment
            </Link>
            <Link to="/results" className="btn btn-secondary btn-sm">
              📊 Recommendation Results
            </Link>
            <Link to="/roadmap" className="btn btn-primary btn-sm">
              🚀 Career Roadmap
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
