exports.up = function(knex, Promise) {
  return knex.schema.alterTable("mandataires", function(table) {
    table.string("cv");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("mandataires", function(table) {
    table.dropColumn("cv");
  });
};
