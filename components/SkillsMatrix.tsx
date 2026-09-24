import { SkillCategory } from '@/data/skills'

interface SkillsMatrixProps {
  skills: SkillCategory[]
}

export function SkillsMatrix({ skills }: SkillsMatrixProps) {
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
      {skills.map((category) => (
        <div key={category.name}>
          <h3 className="border-b border-line pb-3 font-mono text-xs uppercase tracking-eyebrow text-accent">
            {category.name}
          </h3>
          <ul>
            {category.skills.map((skill) => (
              <li key={skill} className="border-b border-line py-2.5 text-lg text-ink/90">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
