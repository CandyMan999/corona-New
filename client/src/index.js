import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "./index.css";
import App from "./components/App";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Comment from "./components/Comment";
import UnitedStates from "./components/UnitedStates";

const client = new ApolloClient({
  uri: "https://coronavirus-react.herokuapp.com/graphql"
});

const Root = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/us" component={UnitedStates} />
      <Comment />
      <Redirect to="/" />
    </Switch>
  </Router>
);

ReactDOM.render(
  <ApolloProvider client={client}>
    <Root />
  </ApolloProvider>,

  document.getElementById("root")
);
