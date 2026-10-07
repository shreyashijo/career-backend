import React from 'react';

export default function StepProgress({ currentStep = 1 }) {
  const steps = [
    { number: 1, label: 'Profile' },
    { number: 2, label: 'Skills' },
    { number: 3, label: 'Interests' },
    { number: 4, label: 'Assessment' }
  ];

  return (
    <div className="step-wizard">
      <ul className="step-list">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isActive = currentStep === step.number;

          return (
            <React.Fragment key={step.number}>
              <li
                className={`step-item ${isActive ? 'active' : ''} ${
                  isCompleted ? 'completed' : ''
                }`}
              >
                <div className="step-circle">
                  {isCompleted ? '✓' : step.number}
                </div>
                <span className="step-label">{step.label}</span>
              </li>
              {index < steps.length - 1 && (
                <div
                  className={`step-divider ${
                    currentStep > step.number ? 'completed' : ''
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
}
