export const ROADMAP_DATA = {
  'cybersecurity-analyst': {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    subtitle: 'Protect systems, defend networks, and perform security analysis.',
    badge: 'High Demand',
    color: '#0284c7',
    milestones: [
      {
        id: 'beginner',
        title: 'Level 1: Beginner (Foundations & Networking)',
        description: 'Master operating systems, computer networking basics, and core security fundamentals.',
        tasks: [
          {
            id: 'cyber-beg-1',
            title: 'Understand TCP/IP, OSI Model & DNS',
            description: 'Learn how data flows across internet protocols, ports, IP routing, and domain name resolution.',
            duration: '2 Weeks'
          },
          {
            id: 'cyber-beg-2',
            title: 'Master Linux Command Line & Administration',
            description: 'Gain fluency in Bash scripting, file permissions, process management, and network utilities (netstat, grep, chmod).',
            duration: '3 Weeks'
          },
          {
            id: 'cyber-beg-3',
            title: 'Learn Core Security Concepts (CIA Triad)',
            description: 'Understand Confidentiality, Integrity, Availability, threat models, authentication vs authorization.',
            duration: '2 Weeks'
          }
        ]
      },
      {
        id: 'intermediate',
        title: 'Level 2: Intermediate (Hands-on Tools & Defense)',
        description: 'Utilize industry tools for network scanning, vulnerability assessment, and log analysis.',
        tasks: [
          {
            id: 'cyber-int-1',
            title: 'Network Traffic Analysis with Wireshark',
            description: 'Capture packet captures (PCAP), analyze HTTP/DNS payloads, and identify anomalies.',
            duration: '3 Weeks'
          },
          {
            id: 'cyber-int-2',
            title: 'Vulnerability Scanning with Nmap & Nessus',
            description: 'Execute port scanning, service enumeration, OS detection, and automated vulnerability scanning.',
            duration: '3 Weeks'
          },
          {
            id: 'cyber-int-3',
            title: 'SIEM Operations with Splunk / Elastic Security',
            description: 'Ingest syslog feeds, write alert rules, monitor dashboards, and triage security incidents.',
            duration: '4 Weeks'
          }
        ]
      },
      {
        id: 'advanced',
        title: 'Level 3: Advanced (Penetration Testing & SOC Triage)',
        description: 'Perform ethical hacking, malware triage, and incident response procedures.',
        tasks: [
          {
            id: 'cyber-adv-1',
            title: 'Ethical Hacking & Metasploit Framework',
            description: 'Understand offensive techniques, exploit discovery, post-exploitation, and privilege escalation.',
            duration: '4 Weeks'
          },
          {
            id: 'cyber-adv-2',
            title: 'Web Application Security (OWASP Top 10)',
            description: 'Test for SQL Injection, Cross-Site Scripting (XSS), CSRF, and broken access controls using Burp Suite.',
            duration: '4 Weeks'
          },
          {
            id: 'cyber-adv-3',
            title: 'Digital Forensics & Incident Response (DFIR)',
            description: 'Perform memory analysis (Volatility), artifact extraction, and timeline reconstruction during breach response.',
            duration: '4 Weeks'
          }
        ]
      },
      {
        id: 'master',
        title: 'Level 4: Master (Enterprise Defense & Industry Certifications)',
        description: 'Architect security frameworks, cloud security controls, and earn industry-recognized certifications.',
        tasks: [
          {
            id: 'cyber-mst-1',
            title: 'Cloud Security Architecture (AWS / Azure Security)',
            description: 'Implement Identity Access Management (IAM), Security Groups, KMS encryption, and GuardDuty auditing.',
            duration: '5 Weeks'
          },
          {
            id: 'cyber-mst-2',
            title: 'Earn Industry Certification (CompTIA Security+ / CEH / OSCP)',
            description: 'Prepare for and complete rigorous professional certification exams validating your expertise.',
            duration: '6 Weeks'
          }
        ]
      }
    ]
  },

  'software-developer': {
    id: 'software-developer',
    title: 'Software Developer',
    subtitle: 'Build robust scalable software systems, APIs, and modern enterprise applications.',
    badge: 'Top Choice',
    color: '#2563eb',
    milestones: [
      {
        id: 'beginner',
        title: 'Level 1: Beginner (Programming Fundamentals & Git)',
        description: 'Master core programming logic, Object-Oriented Principles, and version control.',
        tasks: [
          {
            id: 'dev-beg-1',
            title: 'Master Programming Foundations (Java / Python / C++)',
            description: 'Learn syntax, data types, control structures, functions, and Object-Oriented Programming (OOP) concepts.',
            duration: '3 Weeks'
          },
          {
            id: 'dev-beg-2',
            title: 'Git Version Control & GitHub Workflow',
            description: 'Master repositories, branching strategies, commits, pull requests, and resolving merge conflicts.',
            duration: '2 Weeks'
          },
          {
            id: 'dev-beg-3',
            title: 'Data Structures Fundamentals',
            description: 'Implement arrays, linked lists, stacks, queues, hash maps, and understand Time & Space complexity (Big-O).',
            duration: '3 Weeks'
          }
        ]
      },
      {
        id: 'intermediate',
        title: 'Level 2: Intermediate (Backend Frameworks & SQL Databases)',
        description: 'Build REST APIs, integrate relational databases, and write modular clean code.',
        tasks: [
          {
            id: 'dev-int-1',
            title: 'REST API Development with Spring Boot / Express',
            description: 'Design RESTful endpoints, request validation, exception handling, and MVC pattern architecture.',
            duration: '4 Weeks'
          },
          {
            id: 'dev-int-2',
            title: 'Relational Database Design with MySQL / PostgreSQL',
            description: 'Design schemas, normalization, primary/foreign keys, complex JOIN queries, and indexing.',
            duration: '3 Weeks'
          },
          {
            id: 'dev-int-3',
            title: 'ORM Integration (Hibernate / JPA)',
            description: 'Map Java objects to database entities, manage transactions, lazy loading, and repository interfaces.',
            duration: '3 Weeks'
          }
        ]
      },
      {
        id: 'advanced',
        title: 'Level 3: Advanced (System Design & Microservices)',
        description: 'Design scalable distributed systems, caching layers, and containerization.',
        tasks: [
          {
            id: 'dev-adv-1',
            title: 'System Design & Distributed Architecture',
            description: 'Learn load balancing, horizontal scaling, caching (Redis), database sharding, and message queues (Kafka).',
            duration: '4 Weeks'
          },
          {
            id: 'dev-adv-2',
            title: 'Containerization with Docker & CI/CD Pipelines',
            description: 'Write Dockerfiles, docker-compose configurations, and build automated GitHub Actions CI/CD deployment pipelines.',
            duration: '3 Weeks'
          },
          {
            id: 'dev-adv-3',
            title: 'Automated Testing (JUnit, Mockito & Integration Tests)',
            description: 'Write unit tests, test suites, mock service dependencies, and maintain >80% test coverage.',
            duration: '3 Weeks'
          }
        ]
      },
      {
        id: 'master',
        title: 'Level 4: Master (Enterprise Architecture & Cloud Deployment)',
        description: 'Lead software projects, implement DevOps best practices, and optimize system performance.',
        tasks: [
          {
            id: 'dev-mst-1',
            title: 'Cloud Deployment (AWS EC2 / S3 / RDS)',
            description: 'Deploy application services to AWS cloud, configure SSL domain certificates, load balancers, and monitoring.',
            duration: '5 Weeks'
          },
          {
            id: 'dev-mst-2',
            title: 'Build Full-Stack Capstone Enterprise App',
            description: 'Develop and publish an end-to-end web application with authentication, database persistence, and cloud hosting.',
            duration: '6 Weeks'
          }
        ]
      }
    ]
  },

  'data-scientist': {
    id: 'data-scientist',
    title: 'Data Scientist',
    subtitle: 'Extract actionable intelligence from complex data through statistical models & ML algorithms.',
    badge: 'Emerging Field',
    color: '#7c3aed',
    milestones: [
      {
        id: 'beginner',
        title: 'Level 1: Beginner (Python, Math & Data Wrangling)',
        description: 'Build mathematical foundations in linear algebra, statistics, and Python libraries.',
        tasks: [
          {
            id: 'ds-beg-1',
            title: 'Python for Data Science (NumPy & Pandas)',
            description: 'Manipulate arrays, clean dataframes, handle missing values, and transform datasets efficiently.',
            duration: '3 Weeks'
          },
          {
            id: 'ds-beg-2',
            title: 'Applied Statistics & Probability',
            description: 'Understand mean, variance, normal distribution, hypothesis testing (p-values), and correlation.',
            duration: '3 Weeks'
          },
          {
            id: 'ds-beg-3',
            title: 'Data Visualization (Matplotlib & Seaborn)',
            description: 'Create informative scatter plots, histograms, heatmaps, and boxplots to uncover data trends.',
            duration: '2 Weeks'
          }
        ]
      },
      {
        id: 'intermediate',
        title: 'Level 2: Intermediate (SQL & Supervised Machine Learning)',
        description: 'Query large databases and train supervised predictive models.',
        tasks: [
          {
            id: 'ds-int-1',
            title: 'Advanced SQL Querying & Aggregations',
            description: 'Master Window functions, CTEs, GROUP BY HAVING, and complex subqueries for analytical reporting.',
            duration: '3 Weeks'
          },
          {
            id: 'ds-int-2',
            title: 'Supervised ML with Scikit-Learn',
            description: 'Train Linear/Logistic Regression, Decision Trees, Random Forests, and Gradient Boosting models.',
            duration: '4 Weeks'
          },
          {
            id: 'ds-int-3',
            title: 'Model Evaluation & Hyperparameter Tuning',
            description: 'Cross-validation, ROC-AUC curves, Precision/Recall trade-offs, GridSearch, and feature selection.',
            duration: '3 Weeks'
          }
        ]
      },
      {
        id: 'advanced',
        title: 'Level 3: Advanced (Unsupervised ML & Deep Learning)',
        description: 'Explore clustering techniques, natural language processing, and neural networks.',
        tasks: [
          {
            id: 'ds-adv-1',
            title: 'Unsupervised Learning & Dimensionality Reduction',
            description: 'Apply K-Means clustering, Hierarchical clustering, and Principal Component Analysis (PCA).',
            duration: '3 Weeks'
          },
          {
            id: 'ds-adv-2',
            title: 'Deep Learning Foundations with PyTorch / TensorFlow',
            description: 'Build Artificial Neural Networks (ANN), Convolutional Neural Networks (CNN), and activation functions.',
            duration: '4 Weeks'
          },
          {
            id: 'ds-adv-3',
            title: 'Natural Language Processing (NLP) Basics',
            description: 'Tokenization, TF-IDF vectorization, Sentiment Analysis, and Word Embeddings (Word2Vec).',
            duration: '4 Weeks'
          }
        ]
      },
      {
        id: 'master',
        title: 'Level 4: Master (MLOps & Model Productionization)',
        description: 'Deploy machine learning models as live API services and monitor performance drift.',
        tasks: [
          {
            id: 'ds-mst-1',
            title: 'MLOps & API Model Deployment (FastAPI + Docker)',
            description: 'Wrap trained ML models in FastAPI services, containerize with Docker, and deploy to server.',
            duration: '5 Weeks'
          },
          {
            id: 'ds-mst-2',
            title: 'End-to-End Data Science Project Showcase',
            description: 'Build a real-world predictive dashboard, publish notebooks, and document business impact.',
            duration: '6 Weeks'
          }
        ]
      }
    ]
  }
};
