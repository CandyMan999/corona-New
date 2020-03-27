import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  picture: {
    type: String
  },
  comment: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Comment", CommentSchema);
