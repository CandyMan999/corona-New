import db from "../../db/models";
import { gql } from "apollo-server-express";

export const commentResolver = async (parent, args) => {
  const data = await db.Comment.find();

  return data;
};

export const commentDefs = gql`
  type Comment {
    _id: ID
    name: String!
    picture: String
    comment: String!
  }
`;
