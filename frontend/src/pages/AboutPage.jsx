import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="about-page" style={{ padding: '60px 0 80px 0' }}>
      <div className="container-narrow">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="badge badge-blue" style={{ marginBottom: '12px' }}>
            About The System
          </span>
          <h1 style={{ fontSize: '2.6rem', marginBottom: '16px' }}>About CareerGuide</h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto' }}>
            Empowering students to navigate complex technology landscapes with confidence, clarity, and structured roadmaps.
          </p>
        </div>

        {/* Mission Card */}
        <div className="card" style={{ marginBottom: '40px', padding: '36px' }}>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '16px', color: '#0b192c' }}>
            What is CareerGuide?
          </h2>
          <p style={{ color: '#475569', fontSize: '1rem', lineHeight: '1.7', marginBottom: '16px' }}>
            <strong>CareerGuide – Student Skill and Career Recommendation System</strong> is an intelligent advising platform developed to bridge the gap between academic education and modern industry career demands.
          </p>
          <p style={{ color: '#475569', fontSize: '1rem', lineHeight: '1.7' }}>
            Many university students struggle to decide which specialization aligns best with their natural inclinations—whether software engineering, data science, cybersecurity, cloud architecture, or UI/UX design. CareerGuide solves this through a systematic multi-parameter evaluation of your current competencies, domain interests, and psychological problem-solving style.
          </p>
        </div>

        {/* Section: How CareerGuide Helps You */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '24px', textAlign: 'center' }}>
            How CareerGuide Helps You
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* 1. Skill Analysis */}
            <div className="card" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  background: '#eff6ff',
                  color: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  flexShrink: 0
                }}
              >
                📊
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>1. Skill Analysis</h3>
                <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                  Evaluate your technical competencies across programming languages (Java, Python, C), core CS fundamentals, and soft skills like problem solving, communication, and teamwork.
                </p>
              </div>
            </div>

            {/* 2. Career Recommendations */}
            <div className="card" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  background: '#ecfdf5',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  flexShrink: 0
                }}
              >
                🎯
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>2. Career Recommendations</h3>
                <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                  Receive your top 3 personalized career matches complete with percentage match scores, such as Cybersecurity Analyst (92%), Software Developer (87%), or Data Scientist (78%).
                </p>
              </div>
            </div>

            {/* 3. Learning Roadmap */}
            <div className="card" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  background: '#fffbeb',
                  color: '#f59e0b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  flexShrink: 0
                }}
              >
                🗺️
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>3. Learning Roadmap</h3>
                <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                  Access actionable next steps, target technical certifications, recommended tools, and core subjects to master for transitioning smoothly into high-growth industry roles.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Architecture Note */}
        <div
          className="card"
          style={{
            background: 'linear-gradient(135deg, #0b192c, #13243d)',
            color: 'white',
            border: 'none',
            padding: '32px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span style={{ fontSize: '1.4rem' }}>⚙️</span>
            <h3 style={{ color: 'white', fontSize: '1.2rem' }}>System Architecture</h3>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '16px' }}>
            This web application serves as the complete, responsive React frontend. It is structured with a modular API service layer ready for direct REST integration with our future <strong>Java (Spring Boot)</strong> backend and <strong>MySQL</strong> relational database.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <span className="skill-tag" style={{ background: '#1e293b', color: '#38bdf8', border: '1px solid #334155' }}>
              React + React Router
            </span>
            <span className="skill-tag" style={{ background: '#1e293b', color: '#4ade80', border: '1px solid #334155' }}>
              Java Spring Boot (Upcoming)
            </span>
            <span className="skill-tag" style={{ background: '#1e293b', color: '#facc15', border: '1px solid #334155' }}>
              MySQL Database (Upcoming)
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link to="/profile" className="btn btn-primary btn-lg">
            Start Your Assessment →
          </Link>
        </div>
      </div>
    </div>
  );
}
