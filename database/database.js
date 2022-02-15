const User = require("../models/user");
const Post = require("../models/post");

const database = {
  saveUser: async function (name, email, password) {
    if (!(await this.getUserByEmail(email))) {
      const user = new User({
        name: name,
        email: email,
        password: password,
      });

      const result = await user.save();
      return result;
    } else {
      const data = {
        status_code: 400,
        error_message: "Email address already exists",
      };
      return data;
    }
  },
  getUserByEmail: async function (email) {
    const user = await User.findOne({ email: email });
    return user;
  },
  getUserById: async function (id) {
    const user = await User.findOne({ _id: id });
    return user;
  },
  getPost: async function (postId) {
    const post = await Post.findOne({ _id: postId });
    return post;
  },
  createPost: async function (title, text, userId) {
    const post = new Post({
      title: title,
      text: text,
      userId: userId,
    });
    const result = await post.save(post);
    return result;
  },
  updatePost: async function (postId, title, text, userId) {
    const filter = { _id: postId };
    const update = { title: title, text: text, userId: userId };

    const result = await Post.findOneAndUpdate(filter, update);
    return update;
  },
  deletePost: async function (postId) {
    const post = await Post.findOneAndDelete({ _id: postId });
    return post;
  },
};
module.exports = database;
