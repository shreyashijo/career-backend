import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCareer } from '../context/CareerContext';
import StepProgress from '../components/StepProgress';

const SKILLS_LIST = [
  { name: 'Java', icon: '☕', desc: 'Object-Oriented Programming, Enterprise Software' },
  { name: 'Python', icon: '🐍', desc: 'Scripting, Data Science, AI & Automation' },
  { name: 'C Programming', icon: '⚙️', desc: 'Low-level Memory, Embedded & Systems' },
  { name: 'Problem Solving', icon: '🧩', desc: 'Data Structures, Algorithms, Logic' },
  { name: 'Web Development', icon: '🌐', desc: 'HTML, CSS, JavaScript, Frontend & Backend' },
  { name: 'Cybersecurity', icon: '🛡️', desc: 'Network Security, Ethical Hacking, Defense' },
  { name: 'Data Analysis', icon: '📊', desc: 'Statistics, SQL, Visualization & Insights' },
  { name: 'Communication', icon: '💬', desc: 'Technical Writing, Presentation & Articulation' },
  { name: 'Teamwork', icon: '🤝', desc: 'Agile, Collaboration, Git & Code Reviews' }
];

export default function SkillsPage() {
  const navigate = useNavigate();
  const { skills, toggleSkill } = useCareer();
  const [error, setError] = useState('');

  const handleNext = () => {
    if (skills.length === 0) {
      setError('Please select at least one skill to proceed.');
      return;
    }
    setError('');
    navigate('/interests');
  };

  return (
    <div className="skills-page" style={{ padding: '40px 0 80px 0' }}>
      <div className="container-narrow">
        <StepProgress currentStep={2} />

        <div className="card" style={{ padding: '36px' }}>
          <div style={{ marginBottom: '28px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
            <span className="badge badge-blue" style={{ marginBottom: '8px' }}>
              Step 2 of 4
            </span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '2rem', color: '#0b192c', marginTop: '4px' }}>
                Select Your Skills
              </h1>
              <span className="badge badge-emerald">
                {skills.length} of {SKILLS_LIST.length} selected
              </span>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '4px' }}>
              Check all the skills, programming languages, and competencies you are familiar with.
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
            {SKILLS_LIST.map((item) => {
              const isSelected = skills.includes(item.name);
              return (
                <div
                  key={item.name}
                  id={`skill-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`checkbox-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    toggleSkill(item.name);
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
              onClick={() => navigate('/profile')}
            >
              ← Back to Profile
            </button>
            <button
              type="button"
              id="btn-next-interests"
              className="btn btn-primary btn-lg"
              onClick={handleNext}
            >
              Next → Interests
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
