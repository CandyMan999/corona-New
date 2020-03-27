import { commentDefs, commentResolver } from "./comment";
import { addCommentResolver } from "./mutations";

export const commentDataResolvers = {
  Query: {
    getAllComments: commentResolver
  },
  Mutation: {
    addComment: addCommentResolver
  }
};

export const commentDataDefs = [commentDefs];
