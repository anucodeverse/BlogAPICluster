const express = require("express");

const router = express.Router();

const {
  createUser,
  getUsers,
  updateUser,
} = require("../controllers/userController");

router.post("/", createUser);

router.get("/", getUsers);

router.put("/:id", updateUser);

module.exports = router;