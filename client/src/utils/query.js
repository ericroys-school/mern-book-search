import { gql } from '@apollo/client'

export const GET_USER = gql`
query GET_USER {
    user {
    savedBooks {
      authors
      title
      bookId
    }  
    }
  }
`