import { gql } from "apollo-server-express";

export default gql`
  type Query {
    getState(provinceState: String!): State!
    getAllComments: [Comment]
    getCountry: Country!
  }

  type Mutation {
    addComment(name: String!, picture: String, comment: String!): Comment
  }
`;
