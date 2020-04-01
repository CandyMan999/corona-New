import { gql } from "apollo-server-express";
import axios from "axios";

export const stateResolver = async (parent, args) => {
  const { provinceState } = args;

  const response = await axios({
    url: `http://coronavirusapi.com/getTimeSeries/${provinceState}`,
    method: "GET"
  });

  let info = await response.data
    .split(",")
    .reverse()
    .slice(0, 4);
  console.log(info);

  return {
    confirmed: info[1],
    deaths: info[0],
    active: info[1] - info[0],
    lastUpdate: info[3].slice(4)
  };
};

export const stateDefs = gql`
  type State {
    lastUpdate: String!
    confirmed: Int
    recovered: Int
    deaths: Int
    active: Int
  }
`;
