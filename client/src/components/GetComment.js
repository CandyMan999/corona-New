import React, { Component } from "react";
import { Query } from "react-apollo";
import { GET_ALL_COMMENTS } from "../queries";

class GetComments extends Component {
  render() {
    return (
      <Query query={GET_ALL_COMMENTS}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error...</div>;

          return (
            !!data &&
            !!data.getAllComments && (
              <div
                style={{
                  margin: "4px, 4px",
                  padding: "4px",
                  backgroundColor: "lightBlue",
                  width: "50%",
                  height: "400px",
                  overflowY: "scroll",
                  textAlign: "justify",
                  marginLeft: "25%",
                  marginTop: "20px"
                }}
              >
                {data.getAllComments.reverse().map((comment, i) => (
                  <div key={`comment-${i}`}>
                    <p>
                      <img
                        style={{ height: "30px", marginRight: "5px" }}
                        src={comment.picture}
                        alt={`pic-${i}`}
                      />
                      <span
                        style={{
                          fontFamily: "cursive",
                          color: "magenta",
                          fontWeight: "bolder"
                        }}
                      >
                        {comment.name}
                      </span>
                      : {comment.comment}
                    </p>
                  </div>
                ))}
              </div>
            )
          );
        }}
      </Query>
    );
  }
}

export default GetComments;
