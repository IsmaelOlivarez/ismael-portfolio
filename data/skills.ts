export interface SkillCategory {
  name: string
  skills: string[]
}

export const skillsData: SkillCategory[] = [
  {
    name: 'Languages',
    skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'SQL', 'HTML/CSS']
  },
  {
    name: 'Frameworks & Libraries',
    skills: ['React', 'React Native', 'Next.js', 'Spring Boot', 'Express.js', 'Tailwind CSS']
  },
  {
    name: 'Tools & Platforms',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Git', 'GitHub Actions', 'PostgreSQL', 'Firebase']
  },
  {
    name: 'Concepts',
    skills: ['Microservices', 'REST APIs', 'CI/CD', 'Agile', 'System Design', 'Data Structures']
  }
]
