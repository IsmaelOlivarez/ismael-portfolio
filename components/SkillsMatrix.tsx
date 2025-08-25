import { SkillCategory } from '@/data/skills'
import { TechBadge } from './TechBadge'

interface SkillsMatrixProps {
  skills: SkillCategory[]
}

export function SkillsMatrix({ skills }: SkillsMatrixProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {skills.map((category) => (
        <div key={category.name} className="card text-center">
          <h3 className="text-lg font-semibold text-primary mb-6">
            {category.name}
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {category.skills.map((skill) => (
              <TechBadge key={skill} text={skill} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
