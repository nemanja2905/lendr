
exports.up = function(knex, Promise) {
  return knex.schema.table('reviews', (t) => {
    t.renameColumn('memo', 'review_memo');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('reviews', (t) => {
    t.renameColumn('review_memo', 'memo');
  })
};
