import React, { Component } from "react";
import Dropzone from "react-dropzone";

class PhotoUploader extends Component {
  state = {
    images: []
  };

  componentWillUnmount() {
    this.state.images.forEach(image => URL.revokeObjectURL(image));
  }

  onDropAccepted = files => {
    files.forEach(file => {
      Api.uploadPhoto(file, this.props.id).then(res =>
        this.setState({
          images: [
            ...this.state.images,
            {
              ...file,
              id: res.data.data.imageId,
              preview: URL.createObjectURL(file)
            }
          ]
        })
      );
    });
  };

  clickHandler(e) {
    e.stopPropagation();
  }

  handleDelete = (e, image) => {
    this.clickHandler(e);
    Api.deletePhoto(this.props.id, image.id).then(() => {
      this.setState({
        images: this.state.images.filter(cImage => cImage.id !== image.id)
      });
    });
  };

  render() {
    return (
      <div>
        <Dropzone
          accept="image/jpeg, image/png"
          maxSize={500000}
          onDropAccepted={console.log("test") || this.onDropAccepted}
          onDropRejected={console.log("duh")}
          className="photo-uploader"
        >
          {this.state.images.length >= 1 ? (
            ""
          ) : (
            <div style={{ textAlign: "center" }}>
              <p>
                Click here to upload photos or drag and drop. (JPEG or PNG only){" "}
              </p>{" "}
              <img
                src="https://cdn2.iconfinder.com/data/icons/pictograms-4/512/43-512.png"
                width={100}
                height={100}
                alt="fuck off"
              />
            </div>
          )}
          <div style={{ width: "300px", display: "flex", flexWrap: "wrap" }}>
            {this.state.images.map(image => (
              <div style={{ position: "relative" }}>
                <img
                  src={image.preview}
                  width={100}
                  height={100}
                  alt="fuck off"
                />

                <button
                  className="deleteIcon"
                  onClick={e => this.handleDelete(e, image)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </Dropzone>
      </div>
    );
  }
}

export default PhotoUploader;
