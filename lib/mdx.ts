import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content')

export interface ProjectFrontmatter {
  title: string
  subtitle: string
  role: string
  timeline: string
  teamSize: number
  stack: string[]
  problem: string
  outcomes: string[]
  repoUrl?: string
  liveUrl?: string
  coverImage: string
  gallery: string[]
  tags: string[]
  slug: string
}

export interface BlogFrontmatter {
  title: string
  date: string
  description: string
  tags: string[]
  cover?: string
  draft?: boolean
  slug: string
}

export function getProjects(): ProjectFrontmatter[] {
  const projectsDirectory = path.join(contentDirectory, 'projects')
  const filenames = fs.readdirSync(projectsDirectory)
  
  const projects = filenames
    .filter(filename => filename.endsWith('.mdx') && !filename.startsWith('_'))
    .map(filename => {
      const filePath = path.join(projectsDirectory, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)
      
      return {
        ...data,
        slug: filename.replace(/\.mdx$/, ''),
      } as ProjectFrontmatter
    })
    .sort((a, b) => {
      // Custom order: timeline first, then plant-resilient, then superchat
      const order = ['timeline', 'plant-resilient', 'superchat']
      const aIndex = order.indexOf(a.slug)
      const bIndex = order.indexOf(b.slug)
      
      // If both slugs are in our custom order, sort by that order
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex
      }
      
      // If only one is in our custom order, prioritize it
      if (aIndex !== -1) return -1
      if (bIndex !== -1) return 1
      
      // For any other projects, fall back to timeline sorting
      return new Date(b.timeline.split('–')[1].trim()).getTime() - new Date(a.timeline.split('–')[0].trim()).getTime()
    })
  
  return projects
}

export function getProject(slug: string): { frontmatter: ProjectFrontmatter; content: string } | null {
  try {
    const filePath = path.join(contentDirectory, 'projects', `${slug}.mdx`)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      frontmatter: {
        ...data,
        slug,
      } as ProjectFrontmatter,
      content,
    }
  } catch {
    return null
  }
}

export function getBlogPosts(): BlogFrontmatter[] {
  const blogDirectory = path.join(contentDirectory, 'blog')
  const filenames = fs.readdirSync(blogDirectory)
  
  const posts = filenames
    .filter(filename => filename.endsWith('.mdx') && !filename.startsWith('_'))
    .map(filename => {
      const filePath = path.join(blogDirectory, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)
      
      return {
        ...data,
        slug: filename.replace(/\.mdx$/, ''),
      } as BlogFrontmatter
    })
    .filter(post => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  return posts
}

export function getBlogPost(slug: string): { frontmatter: BlogFrontmatter; content: string } | null {
  try {
    const blogDirectory = path.join(contentDirectory, 'blog')
    const filePath = path.join(blogDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      frontmatter: {
        ...data,
        slug,
      } as BlogFrontmatter,
      content,
    }
  } catch {
    return null
  }
}
