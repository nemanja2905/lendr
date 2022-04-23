
exports.up = function(knex, Promise) {
  return knex.schema.createTable('transactions', (table) => {
    table.increments('id'); // the transaction ID
    table.integer('amount'); // the amount of the transaction
    table.integer('interest'); // the posted interest by the borrower
    table.date('promise_to_pay_date'); // the date on which the borrower promises to return principal + interest
    table.string('memo'); // an optional memo field - figure out how this ties into Dwolla
    table.string('status').defaultTo('pending'); // the status (pending, accepted, active, paid, defaulted)
    table.timestamp('created_at').defaultTo(knex.fn.now()); // created at date of the transaction post
    table.integer('created_by_user_id').unsigned().references('users.id'); // the uid of the person creating the transaction - the borrower
    table.integer('accepted_by_user_id'); // the sender of the money - the lender
    table.boolean('seen_by_recipient').defaultTo(false); // has the recipient seen this transaction
    table.boolean('seen_by_sender').defaultTo(false); // has the sender seen this transaction
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('transactions');
};
