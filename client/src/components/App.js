import React, { Component } from "react";
import "./App.css";
import { Query } from "react-apollo";
import { GET_STATE } from "../queries";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import Comment from "./Comment";
import GetComments from "./GetComment";

const stateList = [
  { label: "AL", value: "Alabama" },
  { label: "AK", value: "Alaska" },
  { label: "AZ", value: "Arizona" },
  { label: "AR", value: "Arkansas" },
  { label: "CA", value: "California" },
  { label: "CO", value: "Colorado" },
  { label: "CT", value: "Conneticut" },
  { label: "DE", value: "Deleware" },
  { label: "FL", value: "Florida" },
  { label: "GA", value: "Georgia" },
  { label: "HI", value: "Hawaii" },
  { label: "ID", value: "Idaho" },
  { label: "IL", value: "Illinois" },
  { label: "IN", value: "Indiana" },
  { label: "IA", value: "Iowa" },
  { label: "KS", value: "Kansas" },
  { label: "KY", value: "Kentucky" },
  { label: "LA", value: "Louisiana" },
  { label: "ME", value: "Maine" },
  { label: "MD", value: "Maryland" },
  { label: "MA", value: "Massachusetts" },
  { label: "MI", value: "Michigan" },
  { label: "MN", value: "Minnesota" },
  { label: "MS", value: "Mississippi" },
  { label: "MO", value: "Missouri" },
  { label: "MT", value: "Montana" },
  { label: "NE", value: "Nebraska" },
  { label: "NV", value: "Nevada" },
  { label: "NH", value: "New Hampshire" },
  { label: "NJ", value: "New Jersey" },
  { label: "NM", value: "New Mexico" },
  { label: "NY", value: "New York" },
  { label: "NC", value: "North Carolina" },
  { label: "ND", value: "North Dakota" },
  { label: "OH", value: "Ohio" },
  { label: "OK", value: "Oklahoma" },
  { label: "OR", value: "Oregon" },
  { label: "PA", value: "Pennsylvania" },
  { label: "PR", value: "Puerto Rico" },
  { label: "RI", value: "Rhode Island" },
  { label: "SC", value: "South Carolina" },
  { label: "SD", value: "South Dakota" },
  { label: "TN", value: "Tennessee" },
  { label: "TX", value: "Texas" },
  { label: "UT", value: "Utah" },
  { label: "VT", value: "Vermont" },
  { label: "VI", value: "Virgin Islands" },
  { label: "VA", value: "Virginia" },
  { label: "WA", value: "Washington" },
  { label: "WV", value: "West Virginia" },
  { label: "WI", value: "Wisconsin" },
  { label: "WY", value: "Wyoming" }
];

class App extends Component {
  state = {
    selectedOption: ""
  };

  handleChange = e => {
    const { value } = e.target;

    this.setState({ selectedOption: value });
  };

  render() {
    const { selectedOption } = this.state;

    return (
      <div
        className="App"
        style={{ display: "flex", height: "100%", width: "100%" }}
      >
        <div
          style={{
            justifyContent: "space-around",
            height: "100%",
            width: "100%"
          }}
        >
          <h1>Who is Dying From CoronaVirus</h1>
          <select
            onChange={this.handleChange}
            name="state"
            value={this.state.selectedOption}
          >
            <option value={""} disabled selected>
              Choose A State
            </option>
            {stateList.map((state, i) => (
              <option key={i} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
          <Query
            query={GET_STATE}
            variables={{ provinceState: selectedOption }}
          >
            {({ data, loading, error }) => {
              if (loading) return <div>Loading...</div>;
              if (error) return <div>Error...</div>;

              let time = moment
                .unix(data.getState.lastUpdate / 1000)
                .format("MM/DD/YYYY HH:mm:A");

              const deathRate = Math.round(
                (Number(data.getState.deaths) /
                  Number(data.getState.confirmed)) *
                  100
              );

              return (
                <div>
                  <h2>
                    <p style={{ color: "blue" }}>
                      {data.getState.provinceState}
                    </p>
                  </h2>
                  <p>Confirmed With this shit!: {data.getState.confirmed}</p>
                  <p>Last Updated: {time}</p>
                  <p>Recovered: {data.getState.recovered}</p>
                  <p>Deaths: {data.getState.deaths}</p>
                  <p>Actively Infected: {data.getState.active}</p>
                  <p>
                    DEATH TOLL %:{" "}
                    <span style={{ color: "red" }}>{deathRate}</span>
                  </p>
                </div>
              );
            }}
          </Query>
          <Comment />

          <h1
            style={{
              fontFamily: "cursive",
              color: "magenta",
              fontWeight: "bolder",
              marginTop: "20px"
            }}
          >
            WTF People Are Saying
          </h1>
          <GetComments />
        </div>
      </div>
    );
  }
}

export default App;
