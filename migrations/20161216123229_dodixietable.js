
exports.up = function(knex, Promise) {
  return knex.schema.createTable('dodixie', function(table){
    table.increments('id').primary();
    table.integer('itemId').notNullable().unique();
    table.bigInteger('volumeSell').notNullable();
    table.bigInteger('buy').notNullable();
    table.bigInteger('sell').notNullable();
    table.integer('markup').notNullable();
    table.bigInteger('histAvg').notNullable();
    table.bigInteger('profitPotential').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('dodixie');
};
