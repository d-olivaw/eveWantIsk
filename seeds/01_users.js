var bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('users').del(),
    knex('users').insert({
      username: 'admin',
      password: bcrypt.hashSync('test', 8),
      isAdmin: true
    }),
    knex('users').insert({
      username: 'tester',
      password: bcrypt.hashSync('test', 8),
      isAdmin: false
    })
  )
}
