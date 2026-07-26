
const keys = {
  PORT: process.env.PORT || 4000,
  MORGAN_DEV: process.env.MORGAN_DEV || 'dev',
  JWT: process.env.JWT || 'testerbackend',
  TIMEJWT: process.env.TIMEJWT || 360000,
  saltPassword: 10,
  URL: process.env.URL || 'http://localhost:3000',
  EMAIL: process.env.EMAIL || '',
  MONGO_URL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/product_request_db',
  URL_IMAGE: process.env.URL_IMAGE || 'http://localhost:4000',
};

export default keys;
