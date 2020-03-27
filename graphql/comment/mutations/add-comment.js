import db from "../../../db/models";

export const addCommentResolver = async (parent, args) => {
  const { name, picture, comment } = args;

  const addComment = await db.Comment.create({
    name,
    picture,
    comment
  });

  return addComment;
};
