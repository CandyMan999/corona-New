import rootDefs from "./rootDefs.js";
import { stateDataDefs, stateDataResolvers } from "./state";
import { commentDataDefs, commentDataResolvers } from "./comment";

export const typeDefs = [rootDefs, ...stateDataDefs, ...commentDataDefs];

export const resolvers = {
  Query: {
    getState: stateDataResolvers.Query.getState,
    getAllComments: commentDataResolvers.Query.getAllComments
  },
  Mutation: {
    addComment: commentDataResolvers.Mutation.addComment
  }
};
