const req = require("express/lib/request");

const validator = {
  validateLoginRegisterRequest: (request, type) => {
    let isValidRequest = false;
    if (type === "register") {
      if (
        (request.name !== undefined || request.name !== "") &&
        (request.email !== undefined || request.email !== "") &&
        (request.password !== undefined || request.password !== "")
      ) {
        isValidRequest = true;
      }
    } else {
      if (
        (request.email !== undefined || request.email !== "") &&
        (request.password !== undefined || request.password !== "")
      ) {
        isValidRequest = true;
      }
    }
    return isValidRequest;
  },
  validateToken: (request) => {
    const cookie = request.cookies["jwt"];
    if (cookie !== undefined) {
      return cookie;
    } else {
      return false;
    }
  },
  validateCreatePostRequest: (request) => {
    let isValidRequest = false;
    if (
      (request.title !== undefined || request.name != "") &&
      (request.text !== undefined || request.text != "")
    ) {
      isValidRequest = true;
    }
    return isValidRequest;
  },
  validateUpdatePostRequest: (request) => {
    let isValidRequest = false;
    if (
      (request.postId !== undefined || request.postId != "") &&
      (request.title !== undefined || request.title != "") &&
      (request.text !== undefined || request.text != "")
    ) {
      isValidRequest = true;
    }
    return isValidRequest;
  },
  validateGetPostRequest: (request) => {
    console.log(request);
    let isValidRequest = false;
    if (request.postId !== undefined || request.postId != "") {
      isValidRequest = true;
    }
    return isValidRequest;
  },
};

module.exports = validator;
