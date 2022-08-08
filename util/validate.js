async function validate(schema, data) {
  let status = {
    isValid: false,
    errors: null,
  };
  try {
    return await schema.validate(data);
  } catch ({ errors }) {
    return res.status(400).json({ errors });
  }
}

module.exports = validate;
