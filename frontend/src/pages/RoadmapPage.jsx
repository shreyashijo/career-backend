import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ROADMAP_DATA } from '../data/roadmapData';
import { apiService } from '../services/apiService';
import { useAuth } from '../context/AuthContext';

export default function RoadmapPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCareerParam = searchParams.get('career') || 'cybersecurity-analyst';

  const [activeCareerId, setActiveCareerId] = useState(
    ROADMAP_DATA[initialCareerParam] ? initialCareerParam : 'cybersecurity-analyst'
  );

  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState('');

  const currentRoadmap = ROADMAP_DATA[activeCareerId] || ROADMAP_DATA['cybersecurity-analyst'];

  // Fetch roadmap progress from backend
  useEffect(() => {
    let isMounted = true;
    const fetchProgress = async () => {
      setIsLoading(true);
      setErrorMessage('');
      const res = await apiService.getRoadmapProgress(activeCareerId);
      if (isMounted) {
        if (res.success && res.data && Array.isArray(res.data.completedTasks)) {
          setCompletedTasks(res.data.completedTasks);
        } else if (res.error) {
          setErrorMessage(res.error);
          setCompletedTasks([]);
        } else {
          setCompletedTasks([]);
        }
        setIsLoading(false);
      }
    };

    fetchProgress();
    return () => {
      isMounted = false;
    };
  }, [activeCareerId]);

  const handleCareerSwitch = (careerId) => {
    setActiveCareerId(careerId);
    setSearchParams({ career: careerId });
  };

  // Toggle task completion
  const handleTaskToggle = async (taskId) => {
    const isCurrentlyCompleted = completedTasks.includes(taskId);
    const updatedTasks = isCurrentlyCompleted
      ? completedTasks.filter((id) => id !== taskId)
      : [...completedTasks, taskId];

    // Optimistic UI update
    setCompletedTasks(updatedTasks);
    setIsSaving(true);
    setSaveSuccessMessage('');
    setErrorMessage('');

    const res = await apiService.saveRoadmapProgress(activeCareerId, updatedTasks);
    setIsSaving(false);

    if (!res.success) {
      // Rollback on error
      setCompletedTasks(completedTasks);
      setErrorMessage(res.error || 'Failed to save progress. Please try again.');
    } else {
      setSaveSuccessMessage('Progress saved to MySQL!');
      setTimeout(() => setSaveSuccessMessage(''), 2500);
    }
  };

  // Calculations
  const allTasks = currentRoadmap.milestones.flatMap((m) => m.tasks);
  const totalTaskCount = allTasks.length;
  const completedTaskCount = allTasks.filter((t) => completedTasks.includes(t.id)).length;
  const overallPercentage = totalTaskCount > 0 ? Math.round((completedTaskCount / totalTaskCount) * 100) : 0;

  return (
    <div style={{ padding: '40px 0 80px 0', minHeight: '80vh' }}>
      <div className="container">
        
        {/* Page Header */}
        <div className="card" style={{ marginBottom: '28px', padding: '32px 24px', textAlign: 'center' }}>
          <span className="badge badge-emerald" style={{ marginBottom: '10px' }}>
            Interactive Learning Path
          </span>
          <h1 style={{ fontSize: '2.4rem', color: '#0b192c', marginBottom: '8px' }}>
            Career Roadmap & Progress Tracker
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '680px', margin: '0 auto 24px auto' }}>
            Step-by-step milestones to master top technical career roles. Track your completed milestones with real-time MySQL persistence.
          </p>

          {/* Career Tabs */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap'
            }}
          >
            {Object.values(ROADMAP_DATA).map((career) => {
              const isActive = career.id === activeCareerId;
              return (
                <button
                  key={career.id}
                  type="button"
                  onClick={() => handleCareerSwitch(career.id)}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '12px',
                    border: isActive ? `2px solid ${career.color}` : '1px solid #cbd5e1',
                    background: isActive ? career.color : '#ffffff',
                    color: isActive ? '#ffffff' : '#334155',
                    fontWeight: '700',
                    fontSize: '0.98rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 4px 14px rgba(0, 0, 0, 0.12)' : 'none'
                  }}
                >
                  {career.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback / Save Banner */}
        {errorMessage && (
          <div
            style={{
              marginBottom: '20px',
              padding: '14px 20px',
              borderRadius: '10px',
              background: '#fee2e2',
              color: '#991b1b',
              border: '1px solid #fca5a5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span>⚠️ {errorMessage}</span>
            <button
              onClick={() => setErrorMessage('')}
              style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#991b1b', fontWeight: 'bold' }}
            >
              ✕
            </button>
          </div>
        )}

        {saveSuccessMessage && (
          <div
            style={{
              marginBottom: '20px',
              padding: '12px 20px',
              borderRadius: '10px',
              background: '#dcfce7',
              color: '#166534',
              border: '1px solid #86efac'
            }}
          >
            ✓ {saveSuccessMessage}
          </div>
        )}

        {/* Overview & Progress Card */}
        <div
          className="card"
          style={{
            marginBottom: '32px',
            padding: '28px',
            borderLeft: `6px solid ${currentRoadmap.color}`
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <span className="badge" style={{ background: currentRoadmap.color, color: 'white' }}>
                  {currentRoadmap.badge}
                </span>
                <h2 style={{ fontSize: '1.8rem', color: '#0b192c' }}>{currentRoadmap.title}</h2>
              </div>
              <p style={{ color: '#64748b', fontSize: '1rem' }}>{currentRoadmap.subtitle}</p>
            </div>

            {/* Overall Progress Widget */}
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '16px 24px',
                textAlign: 'right',
                minWidth: '220px'
              }}
            >
              <div style={{ fontSize: '0.82rem', textTransform: 'uppercase', fontWeight: '700', color: '#64748b', marginBottom: '4px' }}>
                Overall Roadmap Progress {isSaving && '⏳'}
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '800', color: currentRoadmap.color }}>
                {overallPercentage}%
              </div>
              <div style={{ fontSize: '0.85rem', color: '#475569' }}>
                {completedTaskCount} of {totalTaskCount} tasks completed
              </div>
            </div>
          </div>

          {/* Main Progress Bar */}
          <div style={{ marginTop: '20px', height: '12px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${overallPercentage}%`,
                background: currentRoadmap.color,
                transition: 'width 0.4s ease'
              }}
            />
          </div>
        </div>

        {/* Roadmap Milestones */}
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                margin: '0 auto 16px auto',
                border: '4px solid #e2e8f0',
                borderTopColor: currentRoadmap.color,
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}
            />
            Loading your roadmap progress from MySQL...
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {currentRoadmap.milestones.map((milestone, idx) => {
              const milestoneCompletedTasks = milestone.tasks.filter((t) => completedTasks.includes(t.id)).length;
              const milestoneTotalTasks = milestone.tasks.length;
              const milestonePercent = Math.round((milestoneCompletedTasks / milestoneTotalTasks) * 100);

              return (
                <div
                  key={milestone.id}
                  className="card"
                  style={{
                    padding: '28px',
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                  }}
                >
                  {/* Milestone Header */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '12px',
                      flexWrap: 'wrap',
                      gap: '12px'
                    }}
                  >
                    <div>
                      <h3 style={{ fontSize: '1.35rem', color: '#0b192c', marginBottom: '4px' }}>
                        {milestone.title}
                      </h3>
                      <p style={{ color: '#64748b', fontSize: '0.92rem' }}>{milestone.description}</p>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span
                        style={{
                          fontSize: '0.88rem',
                          fontWeight: '700',
                          color: milestonePercent === 100 ? '#16a34a' : currentRoadmap.color,
                          background: milestonePercent === 100 ? '#dcfce7' : '#f1f5f9',
                          padding: '6px 14px',
                          borderRadius: '9999px'
                        }}
                      >
                        {milestoneCompletedTasks} / {milestoneTotalTasks} ({milestonePercent}%)
                      </span>
                    </div>
                  </div>

                  {/* Milestone Progress Bar */}
                  <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden', marginBottom: '20px' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${milestonePercent}%`,
                        background: milestonePercent === 100 ? '#16a34a' : currentRoadmap.color,
                        transition: 'width 0.3s ease'
                      }}
                    />
                  </div>

                  {/* Tasks List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {milestone.tasks.map((task) => {
                      const isChecked = completedTasks.includes(task.id);
                      return (
                        <div
                          key={task.id}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '14px',
                            padding: '16px',
                            borderRadius: '12px',
                            background: isChecked ? '#f0fdf4' : '#fafafa',
                            border: isChecked ? '1px solid #bbf7d0' : '1px solid #e2e8f0',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <input
                            type="checkbox"
                            id={task.id}
                            checked={isChecked}
                            onChange={() => handleTaskToggle(task.id)}
                            style={{
                              width: '20px',
                              height: '20px',
                              marginTop: '2px',
                              accentColor: '#16a34a',
                              cursor: 'pointer'
                            }}
                          />

                          <label
                            htmlFor={task.id}
                            style={{
                              flex: 1,
                              cursor: 'pointer',
                              userSelect: 'none'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                              <span
                                style={{
                                  fontWeight: '700',
                                  fontSize: '1.02rem',
                                  color: isChecked ? '#166534' : '#0f172a',
                                  textDecoration: isChecked ? 'line-through' : 'none'
                                }}
                              >
                                {task.title}
                              </span>

                              {task.duration && (
                                <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#64748b', background: '#ffffff', padding: '2px 8px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                                  ⏱️ {task.duration}
                                </span>
                              )}
                            </div>
                            <p style={{ color: isChecked ? '#15803d' : '#64748b', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' }}>
                              {task.description}
                            </p>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer Navigation CTA */}
        <div className="card" style={{ marginTop: '40px', padding: '24px 32px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Need to reassess your recommended skills?</h3>
          <p style={{ color: '#64748b', marginBottom: '16px', fontSize: '0.92rem' }}>
            Retake the assessment evaluation anytime to discover new career recommendations.
          </p>
          <Link to="/assessment" className="btn btn-secondary">
            Return to Assessment 🔄
          </Link>
        </div>

      </div>
    </div>
  );
}
