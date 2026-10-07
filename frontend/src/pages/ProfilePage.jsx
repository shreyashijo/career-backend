import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCareer } from '../context/CareerContext';
import StepProgress from '../components/StepProgress';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { profile, updateProfile } = useCareer();

  const [formData, setFormData] = useState({
    fullName: profile.fullName || '',
    age: profile.age || '',
    college: profile.college || '',
    course: profile.course || '',
    semester: profile.semester || ''
  });

  useEffect(() => {
    setFormData({
      fullName: profile.fullName || '',
      age: profile.age || '',
      college: profile.college || '',
      course: profile.course || '',
      semester: profile.semester || ''
    });
  }, [profile]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.age || Number(formData.age) < 15 || Number(formData.age) > 65) {
      newErrors.age = 'Please enter a valid age between 15 and 65';
    }
    if (!formData.college.trim()) newErrors.college = 'College name is required';
    if (!formData.course.trim()) newErrors.course = 'Course/Branch is required';
    if (!formData.semester.trim()) newErrors.semester = 'Please select your current semester';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      updateProfile(formData);
      navigate('/skills');
    }
  };

  return (
    <div className="profile-page" style={{ padding: '40px 0 80px 0' }}>
      <div className="container-narrow">
        <StepProgress currentStep={1} />

        <div className="card" style={{ padding: '36px' }}>
          <div style={{ marginBottom: '28px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
            <span className="badge badge-blue" style={{ marginBottom: '8px' }}>
              Step 1 of 4
            </span>
            <h1 style={{ fontSize: '2rem', color: '#0b192c', marginTop: '4px' }}>
              Student Profile Information
            </h1>
            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
              Please enter your academic details to personalize your career recommendation report.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="fullName" className="form-label">
                Full Name <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="e.g. Alex Sharma"
                value={formData.fullName}
                onChange={handleChange}
                className="form-input"
              />
              {errors.fullName && <div className="form-error">{errors.fullName}</div>}
            </div>

            {/* Age & Semester Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label htmlFor="age" className="form-label">
                  Age <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  min="15"
                  max="65"
                  placeholder="e.g. 21"
                  value={formData.age}
                  onChange={handleChange}
                  className="form-input"
                />
                {errors.age && <div className="form-error">{errors.age}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="semester" className="form-label">
                  Semester <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <select
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select Semester</option>
                  <option value="1st Semester">1st Semester</option>
                  <option value="2nd Semester">2nd Semester</option>
                  <option value="3rd Semester">3rd Semester</option>
                  <option value="4th Semester">4th Semester</option>
                  <option value="5th Semester">5th Semester</option>
                  <option value="6th Semester">6th Semester</option>
                  <option value="7th Semester">7th Semester</option>
                  <option value="8th Semester">8th Semester</option>
                  <option value="Graduated / Alumni">Graduated / Alumni</option>
                </select>
                {errors.semester && <div className="form-error">{errors.semester}</div>}
              </div>
            </div>

            {/* College Name */}
            <div className="form-group">
              <label htmlFor="college" className="form-label">
                College Name <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                id="college"
                name="college"
                placeholder="e.g. National Institute of Technology"
                value={formData.college}
                onChange={handleChange}
                className="form-input"
              />
              {errors.college && <div className="form-error">{errors.college}</div>}
            </div>

            {/* Course */}
            <div className="form-group">
              <label htmlFor="course" className="form-label">
                Course / Degree <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                id="course"
                name="course"
                placeholder="e.g. B.Tech Computer Science & Engineering"
                value={formData.course}
                onChange={handleChange}
                className="form-input"
              />
              {errors.course && <div className="form-error">{errors.course}</div>}
            </div>

            {/* Navigation Buttons */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '36px',
                borderTop: '1px solid #e2e8f0',
                paddingTop: '24px'
              }}
            >
              <button type="submit" id="btn-next-skills" className="btn btn-primary btn-lg">
                Next → Skills
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
