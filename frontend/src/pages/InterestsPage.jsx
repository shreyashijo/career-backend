import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCareer } from '../context/CareerContext';
import StepProgress from '../components/StepProgress';

const INTERESTS_LIST = [
  { name: 'Artificial Intelligence & Machine Learning', icon: '🤖', desc: 'Neural networks, generative models, intelligent automation' },
  { name: 'Software Development', icon: '💻', desc: 'Backend systems, architecture, enterprise application development' },
  { name: 'Cybersecurity', icon: '🔒', desc: 'Penetration testing, cryptographic protocols, defensive engineering' },
  { name: 'Cloud Computing', icon: '☁️', desc: 'AWS, Azure, Docker, Kubernetes, distributed microservices' },
  { name: 'Web Development', icon: '🌐', desc: 'Modern responsive web apps, full-stack technologies, APIs' },
  { name: 'Mobile App Development', icon: '📱', desc: 'iOS, Android, Flutter, React Native native experiences' },
  { name: 'Data Science', icon: '📈', desc: 'Big data analytics, predictive modeling, statistical research' },
  { name: 'UI/UX Design', icon: '🎨', desc: 'User experience research, wireframing, interface aesthetics' }
];

export default function InterestsPage() {
  const navigate = useNavigate();
  const { interests, toggleInterest } = useCareer();
  const [error, setError] = useState('');

  const handleNext = () => {
    if (interests.length === 0) {
      setError('Please select at least one interest domain to proceed.');
      return;
    }
    setError('');
    navigate('/assessment');
  };

  return (
    <div className="interests-page" style={{ padding: '40px 0 80px 0' }}>
      <div className="container-narrow">
        <StepProgress currentStep={3} />

        <div className="card" style={{ padding: '36px' }}>
          <div style={{ marginBottom: '28px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
            <span className="badge badge-blue" style={{ marginBottom: '8px' }}>
              Step 3 of 4
            </span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '2rem', color: '#0b192c', marginTop: '4px' }}>
                Select Your Tech Interests
              </h1>
              <span className="badge badge-emerald">
                {interests.length} of {INTERESTS_LIST.length} selected
              </span>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '4px' }}>
              Which technology fields excite you the most? Select all that ignite your curiosity.
            </p>
          </div>

          {error && (
            <div
              style={{
                padding: '12px 16px',
                background: '#fef2f2',
                color: '#b91c1c',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                marginBottom: '20px',
                fontSize: '0.9rem'
              }}
            >
              ⚠️ {error}
            </div>
          )}

          {/* Selection Grid */}
          <div className="selection-grid">
            {INTERESTS_LIST.map((item) => {
              const isSelected = interests.includes(item.name);
              return (
                <div
                  key={item.name}
                  id={`interest-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  className={`checkbox-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    toggleInterest(item.name);
                    if (error) setError('');
                  }}
                >
                  <div className="checkbox-indicator">
                    {isSelected ? '✓' : ''}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                      <span className="checkbox-label">{item.name}</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '36px',
              borderTop: '1px solid #e2e8f0',
              paddingTop: '24px'
            }}
          >
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/skills')}
            >
              ← Back to Skills
            </button>
            <button
              type="button"
              id="btn-next-assessment"
              className="btn btn-primary btn-lg"
              onClick={handleNext}
            >
              Next → Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
