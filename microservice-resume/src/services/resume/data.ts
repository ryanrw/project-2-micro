import { Resume } from "resume"

export const data: Resume = {
  name: `Ryan Willpower`,
  aboutMe: `I’m passionate frontend developer that expertise in JavaScript.\r\nI usually create website using React using create-react-app and Gatsby.\r\nI have experience with Vue.js too. For more information, please visit my Github.\r\nhttps://github.com/Ryan-Willpower`,
  contact: {
    email: `surasak.c.work@ryanoverflow.com`,
    tel: `request in my email`,
  },
  education: [
    {
      name: `Mahanakorn University of Technology`,
      description: `Faculty -> Information Science and Technology\r\nArea -> Network Engineer and Security`,
      duration: `2017 - 2020`,
    },
  ],
  experience: [
    {
      duration: `January 2020`,
      name: `Freelance Website`,
      jobTitle: ``,
      description: `I was given a task to create homepage from already made design, which I spend 11 hours to complete.\r\nThe website is: http://bit.ly/ryan-selfin`,
    },
  ],
  toolSkill: [
    { field: `Frontend`, name: `React`, skill: `Expert` },
    { field: `Backend`, name: `Apollo GraphQL`, skill: `Intermediate` },
  ],
}
