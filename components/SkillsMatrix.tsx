import { SkillCategory } from '@/data/skills'

interface SkillsMatrixProps {
  skills: SkillCategory[]
}

export function SkillsMatrix({ skills }: SkillsMatrixProps) {
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
      {skills.map((category) => (
        <div key={category.name}>
          <h3 className="label label-accent border-b border-line pb-3">{category.name}</h3>
          <ul className="mt-1">
            {category.skills.map((skill) => (
              <li
                key={skill}
                className="border-b border-line/70 py-2.5 text-[0.95rem] text-ink/90"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
