import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCareer } from '../context/CareerContext';
import StepProgress from '../components/StepProgress';

export const ASSESSMENT_QUESTIONS = [
  { id: 1, text: 'Do you enjoy programming and writing code?' },
  { id: 2, text: 'Do you enjoy solving complex problems and puzzles?' },
  { id: 3, text: 'Do you enjoy finding and fixing errors (bugs) in programs?' },
  { id: 4, text: 'Do you enjoy building applications or software?' },
  { id: 5, text: 'Do you enjoy working with numbers, data, and statistics?' },
  { id: 6, text: 'Do you enjoy analyzing information to find patterns or insights?' },
  { id: 7, text: 'Are you interested in cybersecurity and protecting computer systems?' },
  { id: 8, text: 'Do you enjoy investigating problems and finding possible security issues?' },
  { id: 9, text: 'Are you interested in Artificial Intelligence and Machine Learning?' },
  { id: 10, text: 'Do you enjoy learning about new technologies and how they work?' },
  { id: 11, text: 'Do you enjoy designing creative and visually attractive interfaces?' },
  { id: 12, text: 'Are you interested in improving user experience in websites or applications?' },
  { id: 13, text: 'Do you enjoy working in a team?' },
  { id: 14, text: 'Do you enjoy learning new technical skills regularly?' },
  { id: 15, text: 'Do you prefer logical and analytical tasks over creative tasks?' }
];

export default function AssessmentPage() {
  const navigate = useNavigate();
  const { assessmentAnswers, setAnswer, setAllAnswers, generateRecommendations, isLoading } = useCareer();
  const [error, setError] = useState('');

  const answeredCount = Object.keys(assessmentAnswers).length;
  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleQuickFill = (choice = 'yes') => {
    const quickAnswers = {};
    ASSESSMENT_QUESTIONS.forEach((q) => {
      quickAnswers[q.id] = choice;
    });
    setAllAnswers(quickAnswers);
    setError('');
  };

  const handleSubmit = async () => {
    if (answeredCount < totalQuestions) {
      setError(`Please answer all ${totalQuestions} questions to obtain accurate recommendations (Answered: ${answeredCount}/${totalQuestions}).`);
      return;
    }
    setError('');
    await generateRecommendations();
    navigate('/results');
  };

  return (
    <div className="assessment-page" style={{ padding: '40px 0 80px 0' }}>
      <div className="container-narrow">
        <StepProgress currentStep={4} />

        <div className="card" style={{ padding: '36px' }}>
          <div style={{ marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
            <span className="badge badge-blue" style={{ marginBottom: '8px' }}>
              Step 4 of 4
            </span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '2rem', color: '#0b192c', marginTop: '4px' }}>
                Career Assessment Test
              </h1>
              <span className="badge badge-emerald">
                {answeredCount} of {totalQuestions} Answered ({progressPercent}%)
              </span>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '4px' }}>
              Answer these 15 questions honestly to evaluate your career compatibility.
            </p>

            {/* Assessment Progress Bar */}
            <div className="match-bar-container" style={{ height: '8px', marginTop: '16px' }}>
              <div
                className="match-bar-fill"
                style={{ width: `${progressPercent}%`, transition: 'width 0.3s ease' }}
              />
            </div>

            {/* Quick action bar */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => handleQuickFill('yes')}
                title="Select Yes for all questions"
              >
                ⚡ Quick Fill "Yes"
              </button>
            </div>
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

          {/* 15 Questions List */}
          <div className="question-list">
            {ASSESSMENT_QUESTIONS.map((q) => {
              const currentVal = assessmentAnswers[q.id];
              return (
                <div key={q.id} className="question-item">
                  <div className="question-text">
                    <span className="question-number">{q.id}</span>
                    <span>{q.text}</span>
                  </div>

                  <div className="toggle-group">
                    <button
                      type="button"
                      id={`q${q.id}-yes`}
                      className={`toggle-btn yes ${currentVal === 'yes' ? 'active' : ''}`}
                      onClick={() => {
                        setAnswer(q.id, 'yes');
                        if (error) setError('');
                      }}
                    >
                      ✓ Yes
                    </button>
                    <button
                      type="button"
                      id={`q${q.id}-no`}
                      className={`toggle-btn no ${currentVal === 'no' ? 'active' : ''}`}
                      onClick={() => {
                        setAnswer(q.id, 'no');
                        if (error) setError('');
                      }}
                    >
                      ✗ No
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Footer */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '36px',
              borderTop: '1px solid #e2e8f0',
              paddingTop: '24px',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/interests')}
            >
              ← Back to Interests
            </button>

            <button
              type="button"
              id="btn-get-recommendation"
              className="btn btn-cta"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Analyzing Responses... ⏳' : 'Get My Career Recommendation 🎯'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
