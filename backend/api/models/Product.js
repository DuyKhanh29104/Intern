module.exports = {
  attributes: {
    name: { type: 'string', required: true },
    price: { type: 'number', required: true },
    owner: { model: 'user', required: true }
  }
};
