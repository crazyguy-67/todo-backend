function validate(schema) {
  return (req, res, next) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      next();
    } catch (error) {
      const message = error.errors?.[0]?.message || "Validation failed";

      res.status(400).json({
        success: false,
        message,
        errors: error.errors,
      });
    }
  };
}

module.exports = validate;
