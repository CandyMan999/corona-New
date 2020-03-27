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
            return (
              !!this.state.name && (
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
                  />
                  <button type="submit" className="button-primary">
                    Submit
                  </button>
                </form>
              )
            );
          }}
        </Mutation>
        {!this.state.name && <FacebookButton onClick={this.handleFacebook} />}
      </div>
    );
  }
}

export default Comment;
