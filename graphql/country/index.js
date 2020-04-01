import { countryDefs, countryResolver } from "./country";

export const countryDataResolvers = {
  Query: {
    getCountry: countryResolver
  }
};

export const countryDataDefs = [countryDefs];
