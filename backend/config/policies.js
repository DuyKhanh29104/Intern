module.exports.policies = {
  ProductController: {
    create: ['isAuthenticated', 'hasPermission'],
    update: ['isAuthenticated', 'hasPermission'],
    delete: ['isAuthenticated', 'hasPermission'],
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
