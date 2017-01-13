
exports.up = function(knex, Promise) {
  return knex.schema.createTable('dodixie', function(table){
    table.increments('id').primary();
    table.integer('itemid').notNullable().unique();
    table.string('itemname').notNullable();
    table.string('volumesell').notNullable();
    table.string('buy').notNullable();
    table.string('sell').notNullable();
    table.string('markup').notNullable();
    table.string('histavg').notNullable();
    table.string('profitpotential').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('dodixie');
};
