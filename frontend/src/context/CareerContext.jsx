import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { useAuth } from './AuthContext';

const CareerContext = createContext();

const INITIAL_PROFILE = {
  fullName: '',
  age: '',
  college: '',
  course: '',
  semester: ''
};

const DEFAULT_SAMPLE_RECOMMENDATIONS = [
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    matchPercentage: 92,
    badge: 'High Demand',
    skills: ['Networking', 'Linux', 'Ethical Hacking', 'Security Fundamentals'],
    description:
      'Protect networks, data, and information systems against cyber attacks, monitor security operations, and conduct penetration testing.',
    avgSalary: '$95,000 - $135,000 / yr',
    jobGrowth: '+32% (Much faster than average)'
  },
  {
    id: 'software-developer',
    title: 'Software Developer',
    matchPercentage: 87,
    badge: 'Top Choice',
    skills: ['Java', 'Data Structures', 'OOP', 'System Design'],
    description:
      'Design, build, and maintain robust software systems, enterprise applications, backend services, and scalable web solutions.',
    avgSalary: '$105,000 - $145,000 / yr',
    jobGrowth: '+25% (Rapidly growing)'
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    matchPercentage: 78,
    badge: 'Emerging Field',
    skills: ['Python', 'Statistics', 'SQL', 'Machine Learning'],
    description:
      'Leverage statistical analysis, machine learning algorithms, and deep data exploration to extract actionable business and technical insights.',
    avgSalary: '$110,000 - $155,000 / yr',
    jobGrowth: '+35% (Exceptional growth)'
  }
];

export const CareerProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [assessmentAnswers, setAssessmentAnswers] = useState({});
  const [recommendations, setRecommendations] = useState(DEFAULT_SAMPLE_RECOMMENDATIONS);
  const [isLoading, setIsLoading] = useState(false);

  // Synchronize profile state whenever authenticated user changes
  useEffect(() => {
    let isMounted = true;

    if (!isAuthenticated || !user) {
      setProfile(INITIAL_PROFILE);
      setSkills([]);
      setInterests([]);
      setAssessmentAnswers({});
      setRecommendations(DEFAULT_SAMPLE_RECOMMENDATIONS);
      return;
    }

    // Initialize with current logged in user's full name
    setProfile({
      fullName: user.fullName || '',
      age: '',
      college: '',
      course: '',
      semester: ''
    });
    setSkills([]);
    setInterests([]);
    setAssessmentAnswers({});
    setRecommendations(DEFAULT_SAMPLE_RECOMMENDATIONS);

    // Fetch user-specific profile from MySQL via Spring Boot session API
    const loadProfile = async () => {
      try {
        const res = await apiService.getProfile();
        if (isMounted && res.success && res.data) {
          const d = res.data;
          setProfile({
            fullName: d.fullName || user.fullName || '',
            age: d.age != null ? String(d.age) : '',
            college: d.college || '',
            course: d.course || '',
            semester: d.semester || ''
          });

          if (d.profilePayload) {
            try {
              const payload = JSON.parse(d.profilePayload);
              if (Array.isArray(payload.skills)) setSkills(payload.skills);
              if (Array.isArray(payload.interests)) setInterests(payload.interests);
              if (payload.answers && typeof payload.answers === 'object') setAssessmentAnswers(payload.answers);
              if (Array.isArray(payload.recommendations) && payload.recommendations.length > 0) {
                setRecommendations(payload.recommendations);
              }
            } catch {
              // Ignore payload parse errors if any
            }
          }
        }
      } catch (err) {
        console.error('Failed to load user profile:', err);
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [user, isAuthenticated]);

  const updateProfile = (data) => {
    const updated = { ...profile, ...data };
    setProfile(updated);

    if (isAuthenticated) {
      apiService.saveProfile({
        ...updated,
        skills,
        interests,
        answers: assessmentAnswers,
        recommendations
      });
    }
  };

  const toggleSkill = (skill) => {
    setSkills((prev) => {
      const updated = prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill];
      if (isAuthenticated) {
        apiService.saveProfile({
          ...profile,
          skills: updated,
          interests,
          answers: assessmentAnswers,
          recommendations
        });
      }
      return updated;
    });
  };

  const toggleInterest = (interest) => {
    setInterests((prev) => {
      const updated = prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest];
      if (isAuthenticated) {
        apiService.saveProfile({
          ...profile,
          skills,
          interests: updated,
          answers: assessmentAnswers,
          recommendations
        });
      }
      return updated;
    });
  };

  const setAnswer = (questionId, value) => {
    setAssessmentAnswers((prev) => {
      const updated = { ...prev, [questionId]: value };
      if (isAuthenticated) {
        apiService.saveProfile({
          ...profile,
          skills,
          interests,
          answers: updated,
          recommendations
        });
      }
      return updated;
    });
  };

  const setAllAnswers = (answersObj) => {
    setAssessmentAnswers(answersObj);
    if (isAuthenticated) {
      apiService.saveProfile({
        ...profile,
        skills,
        interests,
        answers: answersObj,
        recommendations
      });
    }
  };

  const generateRecommendations = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.evaluateRecommendations({
        profile,
        skills,
        interests,
        answers: assessmentAnswers
      });

      let recs = DEFAULT_SAMPLE_RECOMMENDATIONS;
      if (response.success && response.data && response.data.length > 0) {
        recs = response.data;
      }
      setRecommendations(recs);

      if (isAuthenticated) {
        apiService.saveProfile({
          ...profile,
          skills,
          interests,
          answers: assessmentAnswers,
          recommendations: recs
        });
      }
    } catch (err) {
      console.error('Failed to compute recommendations:', err);
      setRecommendations(DEFAULT_SAMPLE_RECOMMENDATIONS);
    } finally {
      setIsLoading(false);
    }
  };

  const resetAll = () => {
    const emptyProfile = {
      fullName: user?.fullName || '',
      age: '',
      college: '',
      course: '',
      semester: ''
    };
    setProfile(emptyProfile);
    setSkills([]);
    setInterests([]);
    setAssessmentAnswers({});
    setRecommendations(DEFAULT_SAMPLE_RECOMMENDATIONS);

    if (isAuthenticated) {
      apiService.saveProfile({
        ...emptyProfile,
        skills: [],
        interests: [],
        answers: {},
        recommendations: DEFAULT_SAMPLE_RECOMMENDATIONS
      });
    }
  };

  return (
    <CareerContext.Provider
      value={{
        profile,
        skills,
        interests,
        assessmentAnswers,
        recommendations,
        isLoading,
        updateProfile,
        toggleSkill,
        toggleInterest,
        setAnswer,
        setAllAnswers,
        generateRecommendations,
        resetAll
      }}
    >
      {children}
    </CareerContext.Provider>
  );
};

export const useCareer = () => {
  const context = useContext(CareerContext);
  if (!context) {
    throw new Error('useCareer must be used within a CareerProvider');
  }
  return context;
};
