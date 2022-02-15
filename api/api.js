const bcrypt = require("bcryptjs");
const database = require("../database/database");
const validator = require("../healpers/validator");
const jwt = require("jsonwebtoken");

const API = {
  registerUser: async function (request) {
    if (request.method !== "POST") {
      const data = {
        status_code: 400,
        error_message: "Invalid request",
      };
      return data;
    }
    if (validator.validateLoginRegisterRequest(request.body, "register")) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(request.body.password, salt);
      const result = await database.saveUser(
        request.body.name,
        request.body.email,
        hashedPassword
      );
      if (result.status_code === undefined) {
        const { password, ...data } = await result.toJSON();
        return data;
      } else {
        return result;
      }
    } else {
      const data = {
        status_code: 400,
        error_message: "Invalid request",
      };
      return data;
    }
  },
  loginUser: async function (request) {
    if (request.method !== "POST") {
      const data = {
        status_code: 400,
        error_message: "Invalid request",
      };
      return data;
    }
    if (validator.validateLoginRegisterRequest(request.body, "login")) {
      const user = await database.getUserByEmail(request.body.email);
      if (!user) {
        const data = {
          status_code: 404,
          error_message: "User not found",
        };
        return data;
      }

      if (!(await bcrypt.compare(request.body.password, user.password))) {
        const data = {
          status_code: 400,
          error_message: "Incorrect credentials",
        };
        return data;
      }

      const token = jwt.sign({ _id: user.id }, process.env.SECRET);
      return token;
    } else {
      const data = {
        status_code: 400,
        error_message: "Invalid request",
      };
      return data;
    }
  },
  getUser: async function (request) {
    if (request.method !== "GET") {
      const data = {
        status_code: 400,
        error_message: "Invalid request",
      };
      return data;
    }
    const cookie = validator.validateToken(request);
    if (cookie) {
      const claims = jwt.verify(cookie, process.env.SECRET);
      if (!claims) {
        const data = {
          status_code: 401,
          error_message: "Unauthorized requestt",
        };
        return data;
      }
      const user = await database.getUserById(claims._id);
      const { password, ...data } = await user.toJSON();
      return data;
    } else {
      const data = {
        status_code: 401,
        error_message: "Unauthorized requestt",
      };
      return data;
    }
  },
  logout: async function (request, response) {
    if (request.method !== "POST") {
      const data = {
        status_code: 400,
        error_message: "Invalid request",
      };
      return data;
    }
    const cookie = validator.validateToken(request);
    if (!cookie) {
      const data = {
        status_code: 401,
        error_message: "Unauthorized requestt",
      };
      return data;
    } else {
      return response.cookie("jwt", "", { maxAge: 0 });
    }
  },
  getPost: async function (request) {
    if (request.method !== "GET") {
      const data = {
        status_code: 400,
        error_message: "Invalid request",
      };
      return data;
    }
    const cookie = validator.validateToken(request);
    if (!cookie) {
      const data = {
        status_code: 401,
        error_message: "Unauthorized requestt",
      };
      return data;
    }
    if (validator.validateGetPostRequest(request.body)) {
      const result = await database.getPost(request.body.postId);
      return result;
    } else {
      const data = {
        status_code: 400,
        error_message: "Invalid request",
      };
      return data;
    }
  },
  createPost: async function (request) {
    if (request.method !== "POST") {
      const data = {
        status_code: 400,
        error_message: "Invalid request",
      };
      return data;
    }
    const cookie = validator.validateToken(request);
    if (!cookie) {
      const data = {
        status_code: 401,
        error_message: "Unauthorized requestt",
      };
      return data;
    }
    if (validator.validateCreatePostRequest(request.body)) {
      const claims = jwt.verify(cookie, process.env.SECRET);
      const result = await database.createPost(
        request.body.title,
        request.body.text,
        claims._id
      );
      return result;
    } else {
      const data = {
        status_code: 400,
        error_message: "Invalid request",
      };
      return data;
    }
  },
  updatePost: async function (request) {
    if (request.method !== "PUT") {
      const data = {
        status_code: 400,
        error_message: "Invalid request",
      };
      return data;
    }
    const cookie = validator.validateToken(request);
    if (!cookie) {
      const data = {
        status_code: 401,
        error_message: "Unauthorized requestt",
      };
      return data;
    }
    if (validator.validateUpdatePostRequest(request.body)) {
      const claims = jwt.verify(cookie, process.env.SECRET);
      const result = await database.updatePost(
        request.body.postId,
        request.body.title,
        request.body.text,
        claims._id
      );
      return result;
    } else {
      const data = {
        status_code: 400,
        error_message: "Invalid request",
      };
      return data;
    }
  },
  deletePost: async function (request) {
    if (request.method !== "DELETE") {
      const data = {
        status_code: 400,
        error_message: "Invalid request",
      };
      return data;
    }
    const cookie = validator.validateToken(request);
    if (!cookie) {
      const data = {
        status_code: 401,
        error_message: "Unauthorized requestt",
      };
      return data;
    }
    if (validator.validateGetPostRequest(request.body)) {
      const result = await database.deletePost(request.body.postId);
      return result;
    } else {
      const data = {
        status_code: 400,
        error_message: "Invalid request",
      };
      return data;
    }
  },
};

module.exports = API;
