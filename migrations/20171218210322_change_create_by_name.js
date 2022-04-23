
exports.up = function(knex, Promise) {
  return knex.schema.table('reviews', (t) => {
    t.renameColumn('created_by_user_id', 'review_created_by_user_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('reviews', (t) => {
    t.renameColumn('review_created_by_user_id', 'created_by_user_id');
  })
};
