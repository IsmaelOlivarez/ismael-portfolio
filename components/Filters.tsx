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

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    projects.forEach((project) => project.tags.forEach((tag) => tags.add(tag)))
    return Array.from(tags).sort()
  }, [projects])

  const allStacks = useMemo(() => {
    const stacks = new Set<string>()
    projects.forEach((project) => project.stack.forEach((stack) => stacks.add(stack)))
    return Array.from(stacks).sort()
  }, [projects])

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        searchTerm === '' ||
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesTags =
        selectedTags.length === 0 || selectedTags.some((tag) => project.tags.includes(tag))
      const matchesStacks =
        selectedStacks.length === 0 || selectedStacks.some((stack) => project.stack.includes(stack))
      return matchesSearch && matchesTags && matchesStacks
    })
  }, [projects, searchTerm, selectedTags, selectedStacks])

  const toggle = (value: string, list: string[], setList: (v: string[]) => void) =>
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedTags([])
    setSelectedStacks([])
  }

  const hasActiveFilters = searchTerm || selectedTags.length > 0 || selectedStacks.length > 0

  const filterChip = (value: string, active: boolean, onClick: () => void) => (
    <button
      key={value}
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1 font-mono text-[0.68rem] uppercase tracking-wider transition-colors ${
        active
          ? 'border-accent bg-accent text-accent-ink'
          : 'border-line text-muted hover:border-ink hover:text-ink'
      }`}
    >
      {value}
    </button>
  )

  return (
    <div className="space-y-10">
      {/* Search */}
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          type="text"
          placeholder="Search projects…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-full border border-line bg-surface py-3 pl-11 pr-4 font-mono text-sm text-ink placeholder-muted transition-colors focus:border-accent focus:outline-none"
        />
      </div>

      {/* Filter groups */}
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <span className="shrink-0 pt-1.5 font-mono text-[0.62rem] uppercase tracking-eyebrow text-accent sm:w-28">
            Tags
          </span>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) =>
              filterChip(tag, selectedTags.includes(tag), () =>
                toggle(tag, selectedTags, setSelectedTags)
              )
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <span className="shrink-0 pt-1.5 font-mono text-[0.62rem] uppercase tracking-eyebrow text-accent sm:w-28">
            Stack
          </span>
          <div className="flex flex-wrap gap-2">
            {allStacks.map((stack) =>
              filterChip(stack, selectedStacks.includes(stack), () =>
                toggle(stack, selectedStacks, setSelectedStacks)
              )
            )}
          </div>
        </div>
      </div>

      {/* Results header */}
      <div className="flex items-center justify-between border-t border-line pt-6 font-mono text-xs uppercase tracking-wider text-muted">
        <span>
          {filteredProjects.length} / {projects.length} shown
        </span>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-1 text-accent transition-colors hover:text-ink"
          >
            Clear
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-line py-16 text-center">
          <p className="font-mono text-sm uppercase tracking-wider text-muted">
            No projects match your filters
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 font-mono text-xs uppercase tracking-wider text-accent hover:text-ink"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
