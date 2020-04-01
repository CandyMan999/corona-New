import { gql } from "apollo-server-express";
import axios from "axios";

export const countryResolver = async (parent, args) => {
  let response = await axios({
    url: `https://pomber.github.io/covid19/timeseries.json`,
    method: "GET"
  });

  const { date, confirmed, recovered, deaths } = await response.data[
    "US"
  ].reverse()[0];

  return {
    confirmed,
    recovered,
    deaths,
    active: confirmed - recovered - deaths,
    lastUpdate: date
  };
};

export const countryDefs = gql`
  type Country {
    lastUpdate: String!
    confirmed: Int
    recovered: Int
    deaths: Int
    active: Int
  }
`;
