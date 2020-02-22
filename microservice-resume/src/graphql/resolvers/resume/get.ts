import { getResume } from "../../../services/resume/get"
import { ApolloError } from "apollo-server"

export default {
  Query: {
    getResume: async () => {
      try {
        const resume = await getResume()

        return resume
      } catch (error) {
        throw new ApolloError(error.message, error.code)
      }
    },
  },
}
