import { gql } from "apollo-server-express";
import axios from "axios";

export const stateResolver = async (parent, args) => {
  const { provinceState } = args;
  const response = await axios({
    url: "https://covid19.mathdro.id/api/confirmed",
    method: "GET"
  });

  const stateData = response.data.filter(
    state => state.provinceState === provinceState
  );

  const { confirmed, recovered, deaths, active, lastUpdate } = stateData[0];

  return { confirmed, provinceState, recovered, deaths, active, lastUpdate };
};

export const stateDefs = gql`
  type State {
    provinceState: String!
    lastUpdate: String!
    confirmed: Int
    recovered: Int
    deaths: Int
    active: Int
  }
`;
