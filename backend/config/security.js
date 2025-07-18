module.exports.security = {
  cors: {
    allRoutes: true,
    allowOrigins: 'http://localhost:3000',
    allowRequestMethods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowCredentials: true,
    allowRequestHeaders: 'content-type, authorization',
  },
};
