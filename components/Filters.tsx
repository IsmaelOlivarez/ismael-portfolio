'use client'

import { useState, useMemo } from 'react'
import { ProjectFrontmatter } from '@/lib/mdx'
import { ProjectCard } from './ProjectCard'
import { Search, X } from 'lucide-react'

interface FiltersProps {
  projects: ProjectFrontmatter[]
}

export function Filters({ projects }: FiltersProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedStacks, setSelectedStacks] = useState<string[]>([])

  // Get all unique tags and stacks
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    projects.forEach(project => {
      project.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [projects])

  const allStacks = useMemo(() => {
    const stacks = new Set<string>()
    projects.forEach(project => {
      project.stack.forEach(stack => stacks.add(stack))
    })
    return Array.from(stacks).sort()
  }, [projects])

  // Filter projects based on search and selections
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = searchTerm === '' || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => project.tags.includes(tag))

      const matchesStacks = selectedStacks.length === 0 || 
        selectedStacks.some(stack => project.stack.includes(stack))

      return matchesSearch && matchesTags && matchesStacks
    })
  }, [projects, searchTerm, selectedTags, selectedStacks])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const toggleStack = (stack: string) => {
    setSelectedStacks(prev => 
      prev.includes(stack) 
        ? prev.filter(s => s !== stack)
        : [...prev, stack]
    )
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedTags([])
    setSelectedStacks([])
  }

  const hasActiveFilters = searchTerm || selectedTags.length > 0 || selectedStacks.length > 0

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="space-y-6">
        {/* Search */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary/40" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-primary/20 rounded-2xl bg-white dark:bg-primary/5 text-primary placeholder-primary/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          />
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={clearFilters}
              className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-sm rounded-full hover:bg-primary/20 transition-colors"
            >
              Clear all
              <X className="ml-1 h-3 w-3" />
            </button>
          </div>
        )}

        {/* Tag Filters */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-primary uppercase tracking-wider text-center">
            Filter by Tags
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-accent text-white'
                    : 'bg-primary/10 text-primary hover:bg-primary/20'
                }`}
                aria-pressed={selectedTags.includes(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Stack Filters */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-primary uppercase tracking-wider text-center">
            Filter by Technology
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {allStacks.map(stack => (
              <button
                key={stack}
                onClick={() => toggleStack(stack)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedStacks.includes(stack)
                    ? 'bg-accent text-white'
                    : 'bg-primary/10 text-primary hover:bg-primary/20'
                }`}
                aria-pressed={selectedStacks.includes(stack)}
              >
                {stack}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-primary/70">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-primary/60 text-lg">
              No projects match your current filters.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 text-accent hover:text-accent/80 underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
