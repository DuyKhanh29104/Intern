module.exports.policies = {
  ProductController: {
    'delete': true,
    'update': true,
    '*': 'isAuthenticated'
  }
};
