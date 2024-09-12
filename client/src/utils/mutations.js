import { gql } from '@apollo/client';

/**
 * Create user an return minimal fields
 */
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

/**
 * Add book to user's savedBooks
 */
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

/**
 * Remove book from user's savedBooks
 */
export const REMOVE_BOOK = gql`
  mutation UserDeleteBook($bookId: String!) {
    userDeleteBook(bookId: $bookId) {
      savedBooks {
        title
      }
    }
  }
`;

/**
 * Login a user, returning minimal fields
 */
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
