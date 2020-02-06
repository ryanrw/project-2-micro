import { gql } from "apollo-server"

export const createResumeOnlyOneQuery = gql`
  mutation createResumeOnlyOne {
    createResumeOnlyOne {
      status
    }
  }
`

export const getResumeQuery = gql`
  query getResume {
    getResume {
      name
      aboutMe
      contact {
        email
        tel
      }
      education {
        duration
        name
        description
      }
      experience {
        duration
        name
        jobTitle
        description
      }
      toolSkill {
        field
        name
        skill
      }
    }
  }
`

export const deleteResumeQuery = gql`
  mutation deleteResume {
    deleteResume {
      status
    }
  }
`
