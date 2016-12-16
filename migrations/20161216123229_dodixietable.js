
exports.up = function(knex, Promise) {
  return knex.schema.createTable('dodixie', function(table){
    table.increments('id').primary();
    table.integer('itemId').notNullable().unique();
    table.string('itemName').notNullable();
    table.string('volumeSell').notNullable();
    table.string('buy').notNullable();
    table.string('sell').notNullable();
    table.string('markup').notNullable();
    table.string('histAvg').notNullable();
    table.string('profitPotential').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('dodixie');
};
