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
mutation UserSaveBook($input: SaveBookInput) {
  userSaveBook(input: $input) {
    savedBooks {
      bookId
      authors
      title
      link
      description
      image
    }
  }
}
`;
export const REMOVE_BOOK = gql`
  mutation UserDeleteBook($bookId: String!) {
    userDeleteBook(bookId: $bookId) {
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
