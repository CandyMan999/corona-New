import React, { Component } from "react";
import FacebookButton from "./FacebookButton";
import { Mutation } from "react-apollo";
import { ADD_COMMENT } from "../queries";

class Comment extends Component {
  state = {
    name: "",
    comment: "",
    picture: ""
  };

  handleFacebook = async response => {
    await response;
    if (!!response) {
      await this.setState({
        name: response.name,
        picture: response.picture.data.url
      });
    }
  };

  handleSubmit = (e, addComment) => {
    e.preventDefault();
    addComment()
      .catch(err => console.log(err))
      .then(data => console.log(data));
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { comment, name, picture } = this.state;
    return (
      <div style={{ marginTop: "15px" }}>
        <Mutation mutation={ADD_COMMENT} variables={{ comment, name, picture }}>
          {(addComment, { data, loading, error }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error... </div>;
            return (
              <form
                className="form"
                onSubmit={e => this.handleSubmit(e, addComment)}
              >
                <input
                  type="text"
                  name="comment"
                  placeholder="Write a comment"
                  value={comment}
                  onChange={this.handleChange}
                  style={{ width: "100%" }}
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={this.handleChange}
                  style={{ display: "flex" }}
                />
                <button
                  type="submit"
                  className="button-primary"
                  style={{ color: "red" }}
                >
                  Submit
                </button>
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default Comment;
