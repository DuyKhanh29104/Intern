const ProductController = require("../api/controllers/ProductController");

module.exports.routes = {
  '/': { view: 'pages/homepage' },

  'GET /api/products': {
    controller: 'ProductController',
    action: 'find',
    policies: ['isAuthenticated', 'hasPermission'],
    permission: 'view_product'
  },

  'POST /api/products': {
    controller: 'ProductController',
    action: 'create',
    policies: ['isAuthenticated', 'hasPermission'],
    permission: 'add_product'
  },

  'PUT /api/products/:id': {
    controller: 'ProductController',
    action: 'update',
    policies: ['isAuthenticated', 'hasPermission'],
    permission: 'edit_product'
  },

  'DELETE /api/products/:id': {
    controller: 'ProductController',
    action: 'delete',
    policies: ['isAuthenticated', 'hasPermission'],
    permission: 'delete_product'
  },

  'POST /api/register': 'AuthController.register',
  'POST /api/login': 'AuthController.login',

  'GET /api/my-products': {
    controller: 'ProductController',
    action: 'myProducts',
    middleware: 'auth'
  },

  'GET /api/users': {
    controller: 'UserController',
    action: 'getAll',
    policies: ['isAuthenticated', 'hasPermission'],
    permission: 'view_user'
  },

  'PUT /api/users/add-permission': {
    controller: 'UserController',
    action: 'addPermission',
    policies: ['isAuthenticated', 'hasPermission'],
    permission: 'add_user_permission'
  },

  'PUT /api/users/remove-permission': {
    controller: 'UserController',
    action: 'removePermission',
    policies: ['isAuthenticated', 'hasPermission'],
    permission: 'remove_user_permission'
  }
};
