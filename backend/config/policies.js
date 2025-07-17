module.exports.policies = {
  ProductController: {
    create: ['isAuthenticated', 'hasPermission'],
    update: true,
    delete: true,
    find: ['isAuthenticated', 'hasPermission'],
    '*': 'isAuthenticated'
  },

  UserController: {
    getAll: ['isAuthenticated', 'hasPermission'],
    addPermission: ['isAuthenticated', 'hasPermission'],
    removePermission: ['isAuthenticated', 'hasPermission'],
    '*': 'isAuthenticated'
  }
};
