import React, { Component } from "react";
import "./App.css";
import { Query } from "react-apollo";
import { GET_STATE } from "../queries";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import Comment from "./Comment";
import GetComments from "./GetComment";

const stateList = [
  { value: "AL", label: "AL" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Conneticut" },
  { value: "DE", label: "Deleware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "PR", label: "Puerto Rico" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VI", label: "Virgin Islands" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" }
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

              const lapse = Date.now() - data.getState.lastUpdate;
              const time = moment(lapse).format("LLLL");

              const deathRate = Math.round(
                (Number(data.getState.deaths) /
                  Number(data.getState.confirmed)) *
                  100
              );

              return (
                <div>
                  <h2>
                    <p style={{ color: "blue" }}>{this.state.selectedOption}</p>
                  </h2>
                  <p>Confirmed with this Shit!: {data.getState.confirmed}</p>
                  <p>Last Updated: {time}</p>
                  <p>Recovered: {data.getState.recovered || 0}</p>
                  <p>Deaths: {data.getState.deaths}</p>
                  <p>Actively Infected: {data.getState.active}</p>
                  <p>
                    DEATH Rate:{" "}
                    <span style={{ color: "red" }}>{deathRate}%</span>
                  </p>
                </div>
              );
            }}
          </Query>
          <Comment />

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
        </div>
      </div>
    );
  }
}

export default App;
