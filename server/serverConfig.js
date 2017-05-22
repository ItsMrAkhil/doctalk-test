const config = {
  mongoURL: process.env.MONGODB_URI || 'mongodb://localhost/testing-db',
  port: process.env.PORT || 1462,
};

module.exports = config;
