import { gql } from '@apollo/client';

export const CREATE_USER = gql`
mutation UserCreate($input: UserCreateInput) {
  userCreate(input: $input) {
   user {
    email
   }
   token
  }
}
`;

export const ADD_BOOK = gql`
  mutation UserSaveBook($email: String!, $input: SaveBookInput) {
    userSaveBook(email: $email, input: $input) {
      email
      savedBooks {
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`;
export const REMOVE_BOOK = gql`
  mutation UserDeleteBook($email: String!, $bookId: String!) {
    userDeleteBook(email: $email, bookId: $bookId) {
      email
      savedBooks {
        title
      }
    }
  }
`;

export const LOGIN = gql`
mutation UserLogin($input: LoginInput) {
  userLogin(input: $input) {
    user {
      email
      _id
      username
    }
    token
  }
}
`;
