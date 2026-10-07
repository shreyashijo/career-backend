import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-badge">
            <span className="badge badge-blue">✨ AI-Powered Career Intelligence</span>
          </div>
          <h1 className="hero-title">
            Discover Your Perfect <br />
            <span style={{ color: '#2563eb' }}>Career Path 🚀</span>
          </h1>
          <p className="hero-description">
            Uncover the ideal technology career tailored specifically to your unique skills,
            academic journey, and personal interests with intelligent matching algorithms.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/profile" className="btn btn-cta">
              Get Started Now →
            </Link>
            <Link to="/about" className="btn btn-secondary btn-lg">
              Learn More
            </Link>
          </div>

          {/* Quick Metrics */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '40px',
              marginTop: '56px',
              flexWrap: 'wrap'
            }}
          >
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0b192c' }}>15+</div>
              <div style={{ fontSize: '0.88rem', color: '#64748b' }}>Diagnostic Questions</div>
            </div>
            <div style={{ borderRight: '1px solid #cbd5e1' }} />
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#2563eb' }}>90%+</div>
              <div style={{ fontSize: '0.88rem', color: '#64748b' }}>Match Precision</div>
            </div>
            <div style={{ borderRight: '1px solid #cbd5e1' }} />
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#10b981' }}>Top 3</div>
              <div style={{ fontSize: '0.88rem', color: '#64748b' }}>Targeted Roadmaps</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why CareerGuide Section */}
      <section style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px auto' }}>
            <span className="badge badge-emerald" style={{ marginBottom: '12px' }}>
              Why Choose Us
            </span>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '16px' }}>Why CareerGuide</h2>
            <p style={{ color: '#64748b' }}>
              Designed for university students and aspiring professionals seeking clarity in a rapidly evolving tech landscape.
            </p>
          </div>

          <div className="feature-grid">
            {/* Card 1: Personalized Recommendations */}
            <div className="feature-card card-interactive">
              <div className="feature-icon-wrapper" style={{ background: '#eff6ff', color: '#2563eb' }}>
                🎯
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>
                Personalized Recommendations
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Receive high-accuracy career suggestions generated from your specific coding
                proficiencies, academic background, and personal passions.
              </p>
            </div>

            {/* Card 2: Smart Assessment */}
            <div className="feature-card card-interactive">
              <div className="feature-icon-wrapper" style={{ background: '#ecfdf5', color: '#10b981' }}>
                🧠
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>
                Smart Assessment
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Evaluate your problem-solving style, analytical mindset, and technological curiosity
                through an intuitive 15-question evaluation framework.
              </p>
            </div>

            {/* Card 3: Build Your Future */}
            <div className="feature-card card-interactive">
              <div className="feature-icon-wrapper" style={{ background: '#fffbeb', color: '#f59e0b' }}>
                🚀
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>
                Build Your Future
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Identify essential high-yield skills, industry requirements, and growth trajectories
                needed to thrive in your chosen domain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section style={{ padding: '72px 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 48px auto' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '12px' }}>How It Works</h2>
            <p style={{ color: '#64748b' }}>Complete 4 simple steps to unlock your personalized career blueprint.</p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px'
            }}
          >
            {[
              { step: '01', title: 'Enter Profile', desc: 'Tell us your college, course & semester.' },
              { step: '02', title: 'Pick Skills', desc: 'Select technical skills you already know.' },
              { step: '03', title: 'Select Interests', desc: 'Highlight industry areas you find exciting.' },
              { step: '04', title: 'Take Assessment', desc: 'Answer 15 quick Yes/No questions to get recommendations.' }
            ].map((item) => (
              <div
                key={item.step}
                className="card"
                style={{ padding: '24px', position: 'relative' }}
              >
                <div
                  style={{
                    fontSize: '1.8rem',
                    fontWeight: '800',
                    color: '#2563eb',
                    marginBottom: '8px'
                  }}
                >
                  {item.step}
                </div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{item.title}</h4>
                <p style={{ color: '#64748b', fontSize: '0.88rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/profile" className="btn btn-primary btn-lg">
              Start Your Journey Now 🎯
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
