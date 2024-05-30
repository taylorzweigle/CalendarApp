//Taylor Zweigle, 2024
const express = require("express");

const { getTodos, getTodo, createTodo, deleteTodo, updateTodo } = require("../controllers/todoController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getTodos);

router.get("/:id", getTodo);

router.post("/", createTodo);

router.delete("/:id", deleteTodo);

router.patch("/:id", updateTodo);

module.exports = router;
