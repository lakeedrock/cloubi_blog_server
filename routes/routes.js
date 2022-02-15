const router = require("express").Router();
const API = require("../api/api");

router.get("/checkhealth", (req, res) => {
  res.send({
    message: "ok",
  });
});

router.post("/register", async (req, res) => {
  const response = await API.registerUser(req);
  if (response.status_code === undefined) {
    res.send(response);
  } else {
    res.status(response.status_code).send({
      message: response.error_message,
    });
  }
});

router.post("/login", async (req, res) => {
  const response = await API.loginUser(req);
  if (response.status_code === undefined) {
    res.cookie("jwt", response, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // one day
    });
    res.send({
      message: "success",
    });
  } else {
    res.status(response.status_code).send({
      message: response.error_message,
    });
  }
});

router.get("/user", async (req, res) => {
  const response = await API.getUser(req);
  if (response.status_code === undefined) {
    res.send(response);
  } else {
    res.status(response.status_code).send({
      message: response.error_message,
    });
  }
});

router.post("/logout", async (req, res) => {
  const response = await API.logout(req, res);
  if (response.status_code === undefined) {
    response.send({
      message: "success",
    });
  } else {
    res.status(response.status_code).send({
      message: response.error_message,
    });
  }
});

router.get("/post", async (req, res) => {
  const response = await API.getPost(req);
  if (response.status_code === undefined) {
    res.send(response);
  } else {
    res.status(response.status_code).send({
      message: response.error_message,
    });
  }
});

router.post("/post", async (req, res) => {
  const response = await API.createPost(req);
  if (response.status_code === undefined) {
    res.send({
      message: "success",
      post_id: response._id,
    });
  } else {
    res.status(response.status_code).send({
      message: response.error_message,
    });
  }
});

router.put("/post", async (req, res) => {
  const response = await API.updatePost(req);
  if (response.status_code === undefined) {
    res.send({
      message: "success",
    });
  } else {
    res.status(response.status_code).send({
      message: response.error_message,
    });
  }
});

router.delete("/post", async (req, res) => {
  const response = await API.deletePost(req);
  if (response.status_code === undefined) {
    res.send({
      message: "success",
    });
  }
});

module.exports = router;
