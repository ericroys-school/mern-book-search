/** define the types, queries, mutations and input types for mutations */
const typeDefs = `
type User {
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
    _id:ID!
}

type AuthResponse {
    token: String!
    user: User!
}

type Book {
    bookId: String!
    title: String!
    description: String!
    image: String
    link: String
    authors: [String]
}

type Query {
    user(email: String!, username: String!, password: String!, _id:ID!): User
}

input UserCreateInput {
    username: String!
    email: String!
    password: String!
}

input LoginInput {
    email: String!
    password: String!
}

input SaveBookInput {
    bookId: String!
    title: String!
    description: String!
    image: String
    link: String
    authors: [String]
}

type Mutation {
    userCreate(input: UserCreateInput): AuthResponse
    userSaveBook(email:String!, input: SaveBookInput): User
    userDeleteBook(email:String!, bookId: String!): User
    userLogin(input: LoginInput): User
}

`

module.exports = typeDefs;