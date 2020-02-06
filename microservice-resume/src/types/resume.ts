type Field = `Frontend` | `Backend` | `Other`

type Skill = `Expert` | `Intermediate` | `Beginner`

export interface Resume {
  name: string
  aboutMe: string
  contact: {
    email: string
    tel: string
  }
  education: {
    name: string
    description: string
    duration: string
  }[]
  experience: {
    duration: string
    name: string
    jobTitle: string
    description: string
  }[]
  toolSkill: {
    field: Field
    name: string
    skill: Skill
  }[]
}

export interface ResumeResult {
  metadata: Resume
}
