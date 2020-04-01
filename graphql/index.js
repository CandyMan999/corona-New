import rootDefs from "./rootDefs.js";
import { stateDataDefs, stateDataResolvers } from "./state";
import { commentDataDefs, commentDataResolvers } from "./comment";
import { countryDataDefs, countryDataResolvers } from "./country";

export const typeDefs = [
  rootDefs,
  ...stateDataDefs,
  ...commentDataDefs,
  ...countryDataDefs
];

export const resolvers = {
  Query: {
    getState: stateDataResolvers.Query.getState,
    getAllComments: commentDataResolvers.Query.getAllComments,
    getCountry: countryDataResolvers.Query.getCountry
  },
  Mutation: {
    addComment: commentDataResolvers.Mutation.addComment
  }
};
