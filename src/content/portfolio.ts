export type SkillIcon = 'terminal' | 'code' | 'network' | 'braces' | 'shield' | 'database' | 'git'

export interface Project {
  id: string
  title: string
  description: string
  status: 'In progress' | 'Completed'
  technologies: string[]
  repositoryUrl?: `https://${string}`
  demoUrl?: `https://${string}`
}

export interface Certification {
  name: string
  provider: string
  status: 'In Progress' | 'Completion status to be confirmed' | 'Completed'
  description: string
  verificationUrl?: `https://${string}`
}

export const portfolio = {
  name: 'Muhammad Ahtisham Asghar',
  firstName: 'Muhammad',
  displayName: 'Ahtisham Asghar',
  initials: 'MA',
  shortName: 'Ahtisham',
  headline: 'Cybersecurity & Technology Enthusiast',
  email: 'IAMAHTISHAMREAL@GMAIL.COM',
  github: 'https://github.com/AHTISHAMASGHAR',
  githubHandle: 'AHTISHAMASGHAR',
  linkedin: null as `https://${string}` | null,
  siteUrl: 'https://ahtishamasghar.github.io',
  seo: {
    title: 'Muhammad Ahtisham Asghar | Cybersecurity & Technology',
    description:
      'The personal portfolio of Muhammad Ahtisham Asghar, a cybersecurity and technology enthusiast pursuing a BS in Cybersecurity at the University of Sargodha. Explore my skills, learning journey, and projects in progress.',
  },
  hero: {
    eyebrow: 'Driven by curiosity. Guided by purpose.',
    introduction:
      'Exploring the systems behind the screen. Learning to build with purpose, understand the details, and think about security from the start.',
    primaryAction: 'Explore my journey',
  },
  about: {
    introduction:
      'I’m Ahtisham, a curious mind drawn to the intersection of technology and security. I’m learning how systems connect, how software is built, and what it takes to protect them.',
    description:
      'Currently pursuing a BS in Cybersecurity at the University of Sargodha, I’m developing my understanding through coursework, independent learning, and projects in progress. This portfolio is a space to share that journey as it takes shape.',
    principles: [
      {
        title: 'Understand the why',
        description: 'Go beyond the surface. Get curious about how things actually work.',
      },
      {
        title: 'Learn by building',
        description: 'Turn new concepts into practice, reflect, and keep improving.',
      },
      {
        title: 'Think responsibly',
        description: 'Approach security with care, ethics, and respect for others.',
      },
    ],
  },
  skills: [
    {
      name: 'Linux',
      category: 'Operating systems',
      icon: 'terminal',
      description:
        'Exploring the command line, permissions, and the foundations of a Linux environment.',
    },
    {
      name: 'Python',
      category: 'Programming',
      icon: 'code',
      description:
        'Learning to express ideas in code and use scripting to solve small, practical problems.',
    },
    {
      name: 'Networking',
      category: 'Connectivity',
      icon: 'network',
      description:
        'Understanding how devices communicate, from protocols to the structure of networks.',
    },
    {
      name: 'C++',
      category: 'Programming',
      icon: 'braces',
      description: 'Working with programming fundamentals, logic, and the structure of software.',
    },
    {
      name: 'Cybersecurity Fundamentals',
      category: 'Security',
      icon: 'shield',
      description:
        'Building a foundation in threats, defensive concepts, and responsible security practices.',
    },
    {
      name: 'SQL',
      category: 'Data & databases',
      icon: 'database',
      description: 'Exploring relational data, queries, and how applications organize information.',
    },
    {
      name: 'Git & GitHub',
      category: 'Version control',
      icon: 'git',
      description: 'Learning to track changes, organize repositories, and share work thoughtfully.',
    },
  ] satisfies Array<{ name: string; category: string; icon: SkillIcon; description: string }>,
  education: {
    degree: 'BS Cybersecurity',
    institution: 'University of Sargodha',
    status: 'In Progress',
    description:
      'Building an academic foundation in cybersecurity and technology, with a mindset of continuous learning.',
  },
  certifications: [
    {
      name: 'Google Cybersecurity Professional Certificate',
      provider: 'Google',
      status: 'In Progress',
      description:
        'Working through the certificate program to deepen my understanding of cybersecurity fundamentals.',
    },
    {
      name: 'Cisco Cybersecurity Certificate',
      provider: 'Cisco',
      status: 'Completion status to be confirmed',
      description:
        'Completion details are awaiting confirmation. No completed credential is claimed here.',
    },
  ] satisfies Certification[],
  projects: [] as Project[],
  projectsIntro:
    'A space for ideas to become practice. I’m currently working on projects and will share them here when they’re ready.',
  contact: {
    introduction:
      'Have an interesting idea, a learning resource, or a shared curiosity about technology? I’d love to hear from you.',
    linkedinPlaceholder: 'Profile link coming soon',
  },
}

export const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Learning', href: '#learning' },
  { label: 'Projects', href: '#projects' },
] as const
