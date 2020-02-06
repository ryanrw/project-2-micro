import { gql } from "apollo-server"

export default gql`
  type Resume {
    name: String
    aboutMe: String
    contact: Contact
    education: [Education]
    experience: [Experience]
    toolSkill: [ToolSkill]
  }

  type Contact {
    email: String
    tel: String
  }

  type Education {
    name: String
    description: String
    duration: String
  }

  type Experience {
    duration: String
    name: String
    jobTitle: String
    description: String
  }

  type ToolSkill {
    field: Field
    name: String
    skill: Skill
  }

  enum Field {
    Frontend
    Backend
    Other
  }

  enum Skill {
    Expert
    Intermediate
    Beginner
  }
`
