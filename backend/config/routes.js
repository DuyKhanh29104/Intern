module.exports.routes = {
  '/': { view: 'pages/homepage' },
  'GET /api/products': 'ProductController.find',
  'POST /api/products': 'ProductController.create',
  'PUT /api/products/:id': 'ProductController.update',
  'DELETE /api/products/:id': 'ProductController.delete',
  'POST /api/register': 'AuthController.register',
  'POST /api/login': 'AuthController.login',
};

