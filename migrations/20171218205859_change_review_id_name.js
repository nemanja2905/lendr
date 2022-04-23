
exports.up = function(knex, Promise) {
  return knex.schema.table('reviews', (t) => {
    t.renameColumn('id', 'review_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('reviews', (t) => {
    t.renameColumn('review_id', 'id');
  })
};
