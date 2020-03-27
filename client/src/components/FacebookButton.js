import React from "react";
const {
  default: FacebookLogin
} = require("react-facebook-login/dist/facebook-login-render-props");

class FacebookButton extends React.PureComponent {
  handleOnClick = response => {
    this.props.onClick(response);
  };

  render() {
    return (
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_ID}
        autoLoad={false}
        fields="name,email,picture"
        callback={this.handleOnClick}
        render={({ onClick }) => (
          <button
            style={{ width: "300px", backgroundColor: "blue" }}
            onClick={onClick}
          >
            <div
              style={{
                paddingLeft: "4px",
                paddingRight: "4px",
                paddingY: "6px",
                justifyContent: "space-around"
              }}
            >
              {/* <Icon
                name="facebook"
                color={COLORS.white}
                size={ICON_SIZES.LARGE}
              /> */}
              <span
                style={{
                  color: "white",
                  fontSize: "16px",
                  position: "relative",
                  top: "3px"
                }}
              >
                Authenticate FB to Create Comment
              </span>
            </div>
          </button>
        )}
      />
    );
  }
}

export default FacebookButton;
