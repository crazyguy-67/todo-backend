const express = require("express");

const {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo.controller");

const protect = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");

const {
  createTodoSchema,
  updateTodoSchema,
} = require("../schemas/todo.schema");

const router = express.Router();

router.use(protect);

router.post("/", validate(createTodoSchema), createTodo);
router.get("/", getTodos);
router.get("/:id", getTodoById);
router.put("/:id", validate(updateTodoSchema), updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
