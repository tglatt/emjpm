exports.up = function(knex) {
  return knex.schema.alterTable("users_tis", function(table) {
    table.string("nom");
    table.string("prenom");
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable("users_tis", function(table) {
    table.dropColumn("nom");
    table.dropColumn("prenom");
  });
};
