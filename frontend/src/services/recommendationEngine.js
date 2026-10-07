/**
 * Career Recommendation Knowledge Base and Scoring Engine
 * Prepared for future Java/MySQL backend data model synchronization
 */

export const CAREER_DATABASE = [
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    badge: 'High Demand',
    matchBenchmark: 92,
    skills: ['Networking', 'Linux', 'Ethical Hacking', 'Security Fundamentals'],
    description:
      'Protect networks, data, and information systems against cyber attacks, monitor security operations, and conduct penetration testing.',
    avgSalary: '$95,000 - $135,000 / yr',
    jobGrowth: '+32% (Much faster than average)',
    relevantSkills: ['Cybersecurity', 'Problem Solving', 'C Programming'],
    relevantInterests: ['Cybersecurity', 'Cloud Computing'],
    relevantQuestions: [7, 8, 2, 10]
  },
  {
    id: 'software-developer',
    title: 'Software Developer',
    badge: 'Top Choice',
    matchBenchmark: 87,
    skills: ['Java', 'Data Structures', 'OOP', 'System Design'],
    description:
      'Design, build, and maintain robust software systems, enterprise applications, backend services, and scalable web solutions.',
    avgSalary: '$105,000 - $145,000 / yr',
    jobGrowth: '+25% (Rapidly growing)',
    relevantSkills: ['Java', 'Problem Solving', 'C Programming', 'Teamwork'],
    relevantInterests: ['Software Development', 'Web Development'],
    relevantQuestions: [1, 2, 3, 4, 13]
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    badge: 'Emerging Field',
    matchBenchmark: 78,
    skills: ['Python', 'Statistics', 'SQL', 'Machine Learning'],
    description:
      'Leverage statistical analysis, machine learning algorithms, and deep data exploration to extract actionable business and technical insights.',
    avgSalary: '$110,000 - $155,000 / yr',
    jobGrowth: '+35% (Exceptional growth)',
    relevantSkills: ['Python', 'Data Analysis', 'Problem Solving'],
    relevantInterests: ['Data Science', 'Artificial Intelligence & Machine Learning'],
    relevantQuestions: [5, 6, 9, 15]
  },
  {
    id: 'cloud-solutions-architect',
    title: 'Cloud Solutions Architect',
    badge: 'Enterprise Leader',
    matchBenchmark: 74,
    skills: ['AWS/Azure', 'Docker/Kubernetes', 'Linux', 'Microservices'],
    description:
      'Architect resilient, fault-tolerant cloud infrastructures and orchestrate multi-cloud deployment strategies.',
    avgSalary: '$125,000 - $170,000 / yr',
    jobGrowth: '+28%',
    relevantSkills: ['Cybersecurity', 'Problem Solving', 'Java'],
    relevantInterests: ['Cloud Computing', 'Software Development'],
    relevantQuestions: [4, 7, 10, 14]
  },
  {
    id: 'ai-ml-engineer',
    title: 'AI / Machine Learning Engineer',
    badge: 'Cutting-Edge',
    matchBenchmark: 72,
    skills: ['PyTorch', 'TensorFlow', 'NLP', 'Computer Vision'],
    description:
      'Develop intelligent models, neural networks, and generative AI agents that automate reasoning and transform industries.',
    avgSalary: '$120,000 - $165,000 / yr',
    jobGrowth: '+40%',
    relevantSkills: ['Python', 'Problem Solving', 'Data Analysis'],
    relevantInterests: ['Artificial Intelligence & Machine Learning', 'Data Science'],
    relevantQuestions: [1, 2, 9, 10, 15]
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    badge: 'Creative Tech',
    matchBenchmark: 70,
    skills: ['Figma', 'User Research', 'Design Systems', 'Prototyping'],
    description:
      'Create seamless, intuitive, and visually captivating digital products that delight users and elevate brand experiences.',
    avgSalary: '$85,000 - $125,000 / yr',
    jobGrowth: '+18%',
    relevantSkills: ['Web Development', 'Communication', 'Teamwork'],
    relevantInterests: ['UI/UX Design', 'Web Development'],
    relevantQuestions: [11, 12, 13]
  }
];

/**
 * Calculates top 3 career recommendations based on user selections and assessment answers.
 */
export function calculateRecommendations({ skills = [], interests = [], answers = {} }) {
  // If answers or selections are empty, provide the curated default showcase top 3
  const answeredCount = Object.keys(answers).length;

  const scoredCareers = CAREER_DATABASE.map((career) => {
    let score = 0;
    let maxPossible = 0;

    // 1. Skill alignment (weight: 35%)
    const skillWeight = 35;
    maxPossible += skillWeight;
    const matchedSkills = career.relevantSkills.filter((s) => skills.includes(s));
    if (career.relevantSkills.length > 0) {
      score += (matchedSkills.length / career.relevantSkills.length) * skillWeight;
    }

    // 2. Interest alignment (weight: 35%)
    const interestWeight = 35;
    maxPossible += interestWeight;
    const matchedInterests = career.relevantInterests.filter((i) => interests.includes(i));
    if (career.relevantInterests.length > 0) {
      score += (matchedInterests.length / career.relevantInterests.length) * interestWeight;
    }

    // 3. Assessment answers (weight: 30%)
    const qWeight = 30;
    maxPossible += qWeight;
    let qMatches = 0;
    career.relevantQuestions.forEach((qNum) => {
      if (answers[qNum] === 'yes') {
        qMatches++;
      }
    });
    if (career.relevantQuestions.length > 0) {
      score += (qMatches / career.relevantQuestions.length) * qWeight;
    }

    let calculatedPercentage = Math.round((score / maxPossible) * 100);

    // If user filled in default or typical flow, align nicely with benchmark
    if (answeredCount === 0 && skills.length === 0 && interests.length === 0) {
      calculatedPercentage = career.matchBenchmark;
    } else {
      // Blend 30% benchmark baseline + 70% direct dynamic score for consistent, high quality percentages
      calculatedPercentage = Math.round(
        career.matchBenchmark * 0.3 + calculatedPercentage * 0.7
      );
      // Clamp between 55% and 98%
      calculatedPercentage = Math.min(98, Math.max(55, calculatedPercentage));
    }

    return {
      ...career,
      matchPercentage: calculatedPercentage
    };
  });

  // Sort descending by match percentage
  scoredCareers.sort((a, b) => b.matchPercentage - a.matchPercentage);

  // Return Top 3
  return scoredCareers.slice(0, 3);
}
