module.exports = {

  development: {
    client: 'postgres',
    connection: 'postgres://localhost:5432/evedatabase'
  },
  production: {
    client: 'postgres',
    connection: process.env.DATABASE_URL
  }
};
