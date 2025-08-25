export interface TimelineItem {
  id: string
  title: string
  subtitle: string
  period: string
  description: string
  type: 'education' | 'experience'
  tags: string[]
}

export const timelineData: TimelineItem[] = [
  {
    id: 'columbia',
    title: 'Columbia University',
    subtitle: 'Bachelor of Arts in Computer Science',
    period: '2021 - 2025',
    description: 'Studying computer science with focus on software engineering, algorithms, and systems design.',
    type: 'education',
    tags: ['Computer Science', 'Software Engineering', 'Algorithms', 'Systems Design']
  },
  {
    id: 'comerica-intern',
    title: 'Software Engineer Intern',
    subtitle: 'Comerica Bank',
    period: 'May 2024 - Present',
    description: 'Building scalable backend services and APIs for banking applications. Working with Spring Boot, AWS, and microservices architecture.',
    type: 'experience',
    tags: ['Spring Boot', 'AWS', 'Microservices', 'Java', 'REST APIs']
  },
  {
    id: 'google-instructor',
    title: 'Computer Science Instructor',
    subtitle: 'Google',
    period: 'June 2023 - August 2023',
    description: 'Taught computer science fundamentals to high school students through Google\'s CS First program.',
    type: 'experience',
    tags: ['Teaching', 'Computer Science', 'Education', 'Python', 'Scratch']
  }
]
