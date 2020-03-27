import { stateDefs, stateResolver } from "./state";

export const stateDataResolvers = {
  Query: {
    getState: stateResolver
  }
};

export const stateDataDefs = [stateDefs];
