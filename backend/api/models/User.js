const bcrypt = require('bcrypt');

module.exports = {
  attributes: {
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true
    },
    password: {
      type: 'string',
      required: true,
      protect: true
    },
    permissions: {
      type: 'json',
      defaultsTo: ['view_product']
    }
  },

  customToJSON: function () {
    return _.omit(this, ['password']);
  },

  beforeCreate: async function (user, proceed) {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    return proceed();
  }
};
