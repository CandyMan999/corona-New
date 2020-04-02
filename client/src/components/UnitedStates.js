import React, { Component } from "react";
import "./App.css";
import { Query } from "react-apollo";
import { GET_COUNTRY } from "../queries";
import Comment from "../components/Comment";
import GetComments from "../components/GetComment";
import { withRouter, NavLink } from "react-router-dom";
import { RingLoader } from "react-spinners";

class UnitedStates extends Component {
  render() {
    return (
      <div
        className="App"
        style={{ display: "flex", height: "100%", width: "100%" }}
      >
        <NavLink to="/">
          <button style={{ position: "absolute", backgroundColor: "gold" }}>
            Go home
          </button>
        </NavLink>
        <div
          style={{
            justifyContent: "space-around",
            height: "100%",
            width: "100%"
          }}
        >
          <Query query={GET_COUNTRY}>
            {({ data, loading, error }) => {
              if (loading)
                return (
                  <div
                    style={{
                      display: "flex",
                      marginTop: "10px",
                      justifyContent: "center",
                      height: "100%",
                      width: "100%"
                    }}
                  >
                    <RingLoader sizeUnit="px" size={100} color="lightBlue" />
                  </div>
                );
              if (error)
                return (
                  <div
                    style={{
                      justifyContent: "space-around",
                      height: "100%",
                      width: "100%"
                    }}
                  >
                    Error...
                  </div>
                );

              const deathRate = Math.round(
                (Number(data.getCountry.deaths) /
                  Number(data.getCountry.confirmed)) *
                  100
              );
              return (
                <div
                  style={{
                    justifyContent: "space-around",
                    height: "100%",
                    width: "100%"
                  }}
                >
                  <h1 style={{ color: "blue", marginTop: "20px" }}>
                    United States
                  </h1>

                  <p>Confirmed with this Shit!: {data.getCountry.confirmed}</p>
                  <p>Last Updated: {data.getCountry.lastUpdate}</p>
                  <p>Recovered: {data.getCountry.recovered}</p>
                  <p>Deaths: {data.getCountry.deaths}</p>
                  <p>Actively Infected: {data.getCountry.active}</p>
                  <p>
                    DEATH Rate:{" "}
                    <span style={{ color: "red" }}>{deathRate}%</span>
                  </p>
                </div>
              );
            }}
          </Query>

          <h1
            style={{
              fontFamily: "monospace",
              color: "aquamarine",
              fontWeight: "bolder",
              marginTop: "20px"
            }}
          >
            WTF People Are Saying
          </h1>
          <GetComments />
          <Comment />
        </div>
      </div>
    );
  }
}

export default withRouter(UnitedStates);
