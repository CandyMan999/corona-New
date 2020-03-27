import { gql } from "apollo-boost";

// Recipes Queries
export const GET_STATE = gql`
  query($provinceState: String!) {
    getState(provinceState: $provinceState) {
      provinceState
      confirmed
      lastUpdate
      recovered
      deaths
      active
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation($name: String!, $picture: String, $comment: String!) {
    addComment(name: $name, picture: $picture, comment: $comment) {
      _id
      name
      comment
    }
  }
`;

export const GET_ALL_COMMENTS = gql`
  query {
    getAllComments {
      name
      comment
      picture
    }
  }
`;
