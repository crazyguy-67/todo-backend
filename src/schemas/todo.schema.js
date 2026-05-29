const { z } = require("zod");

const createTodoSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),

    description: z.string().optional(),
  }),
});

const updateTodoSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title cannot be empty").optional(),

    description: z.string().optional(),

    completed: z.boolean().optional(),
  }),
});

module.exports = {
  createTodoSchema,
  updateTodoSchema,
};
