import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCareer } from '../context/CareerContext';
import { apiService } from '../services/apiService';

export default function ResultsPage() {
  const navigate = useNavigate();
  const { profile, recommendations, resetAll } = useCareer();
  const [activatingSlug, setActivatingSlug] = useState(null);

  const studentName = profile.fullName ? profile.fullName.trim() : 'Student';

  const handleStartRoadmap = async (career) => {
    let slug = career.id;
    if (!slug) {
      const title = (career.title || '').toLowerCase();
      if (title.includes('cyber')) slug = 'cybersecurity-analyst';
      else if (title.includes('data')) slug = 'data-scientist';
      else slug = 'software-developer';
    }

    setActivatingSlug(slug);
    try {
      await apiService.startRoadmap(slug);
    } catch (e) {
      // Continue navigation even if offline
    }
    setActivatingSlug(null);
    navigate(`/roadmap?career=${slug}`);
  };

  const handleStartAgain = () => {
    resetAll();
    navigate('/profile');
  };

  return (
    <div className="results-page" style={{ padding: '40px 0 80px 0' }}>
      <div className="container-narrow">
        {/* Header Greeting */}
        <div className="card" style={{ marginBottom: '32px', textAlign: 'center', padding: '40px 24px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🎉</div>
          <span className="badge badge-emerald" style={{ marginBottom: '12px' }}>
            Analysis Complete
          </span>
          <h1 style={{ fontSize: '2.5rem', color: '#0b192c', marginBottom: '8px' }}>
            Hello, <span style={{ color: '#2563eb' }}>{studentName}</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Based on your skills, technology interests, and 15-point assessment evaluation, here are your
            curated <strong>Top 3 Career Recommendations</strong>.
          </p>

          {/* Student Profile Pill */}
          {(profile.college || profile.course || profile.semester) && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                marginTop: '20px',
                padding: '8px 18px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '9999px',
                fontSize: '0.88rem',
                color: '#475569',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}
            >
              {profile.course && <span>📚 {profile.course}</span>}
              {profile.semester && <span>• 🎓 {profile.semester}</span>}
              {profile.college && <span>• 🏛️ {profile.college}</span>}
            </div>
          )}
        </div>

        {/* Top 3 Career Recommendations */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#0b192c', marginBottom: '20px' }}>
            Top 3 Career Recommendations
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {recommendations.map((career, index) => {
              const rank = index + 1;
              const matchScore = career.matchPercentage || (index === 0 ? 92 : index === 1 ? 87 : 78);

              // Ranking colors
              const rankColor = rank === 1 ? '#eab308' : rank === 2 ? '#94a3b8' : '#cd7f32';

              return (
                <div
                  key={career.id || index}
                  className="card card-interactive"
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderLeft: rank === 1 ? '6px solid #2563eb' : '1px solid #e2e8f0'
                  }}
                >
                  {/* Top Bar with Title and Match Score */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '16px',
                      flexWrap: 'wrap'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <span
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: '#0b192c',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: '700',
                            fontSize: '0.85rem'
                          }}
                        >
                          {rank}
                        </span>
                        <h3 style={{ fontSize: '1.5rem', color: '#0b192c' }}>
                          {career.title}
                        </h3>
                      </div>
                      <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: '640px', lineHeight: '1.6' }}>
                        {career.description}
                      </p>
                    </div>

                    {/* Match Score Badge */}
                    <div style={{ textAlign: 'right' }}>
                      <div
                        style={{
                          fontSize: '1.6rem',
                          fontWeight: '800',
                          color: '#2563eb',
                          lineHeight: '1'
                        }}
                      >
                        {matchScore}%
                      </div>
                      <div style={{ fontSize: '0.78rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>
                        Match Score
                      </div>
                    </div>
                  </div>

                  {/* Match Percentage Progress Bar */}
                  <div className="match-bar-container">
                    <div
                      className="match-bar-fill"
                      style={{
                        width: `${matchScore}%`,
                        background:
                          rank === 1
                            ? 'linear-gradient(90deg, #2563eb, #00d2ff)'
                            : rank === 2
                            ? 'linear-gradient(90deg, #3b82f6, #10b981)'
                            : 'linear-gradient(90deg, #6366f1, #a855f7)'
                      }}
                    />
                  </div>

                  {/* Skills Section */}
                  <div style={{ marginTop: '16px' }}>
                    <div
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: '700',
                        color: '#0f172a',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        marginBottom: '8px'
                      }}
                    >
                      Key Required Skills:
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {career.skills &&
                        career.skills.map((skill) => (
                          <span key={skill} className="skill-tag">
                            ✓ {skill}
                          </span>
                        ))}
                    </div>
                  </div>

                  {/* Career Highlights (Salary & Growth) */}
                  {(career.avgSalary || career.jobGrowth) && (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '18px',
                        paddingTop: '14px',
                        borderTop: '1px solid #f1f5f9',
                        fontSize: '0.85rem',
                        color: '#64748b',
                        flexWrap: 'wrap',
                        gap: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        {career.avgSalary && (
                          <div>
                            <strong>💰 Avg Salary:</strong> {career.avgSalary}
                          </div>
                        )}
                        {career.jobGrowth && (
                          <div>
                            <strong>📈 Growth Outlook:</strong> {career.jobGrowth}
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        disabled={activatingSlug === (career.id || ((career.title || '').toLowerCase().includes('cyber') ? 'cybersecurity-analyst' : (career.title || '').toLowerCase().includes('data') ? 'data-scientist' : 'software-developer'))}
                        style={{ padding: '8px 16px', fontSize: '0.88rem' }}
                        onClick={() => handleStartRoadmap(career)}
                      >
                        {activatingSlug === (career.id || ((career.title || '').toLowerCase().includes('cyber') ? 'cybersecurity-analyst' : (career.title || '').toLowerCase().includes('data') ? 'data-scientist' : 'software-developer'))
                          ? 'Starting Roadmap...'
                          : 'View My Career Roadmap →'}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Controls */}
        <div
          className="card"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '24px 32px',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Want to explore alternative paths?</h4>
            <p style={{ color: '#64748b', fontSize: '0.88rem' }}>
              You can re-take the assessment anytime with updated skills or interests.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              id="btn-print"
              className="btn btn-secondary"
              onClick={() => window.print()}
            >
              🖨️ Print / Save PDF
            </button>
            <button
              type="button"
              id="btn-start-again"
              className="btn btn-primary"
              onClick={handleStartAgain}
            >
              Start Again 🔄
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
