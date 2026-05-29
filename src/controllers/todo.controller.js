const Todo = require("../models/todo.model");

async function createTodo(req, res, next) {
  try {
    const { title, description } = req.body;

    const todo = await Todo.create({
      title,
      description,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Todo created successfully!",
    });
  } catch (error) {
    next(error);
  }
}

async function getTodo(req, res, next) {
  try {
    const todos = await Todo.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: todos.length,
      todos,
    });
  } catch (error) {
    next(error);
  }
}

async function getTodoById(req, res, next) {
  try {
    const todo = await Todo.findOne({
      _id: req.params._id,
      user: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.json({
      success: true,
      todo,
    });
  } catch (error) {
    next(error);
  }
}

async function updateTodo(req, res, next) {
  try {
    const todo = await Todo.findOneAndUpdate(
      {
        _id: req.params._id,
        user: req.user._id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found!",
      });
    }

    res.json({
      success: true,
      message: "Todo updated successfully",
      todo,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteTodo(req, res, next) {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params._id,
      user: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found!",
      });
    }

    res.json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};
