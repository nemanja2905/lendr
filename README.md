### Lender API

Basic Idea:

The API server that will interact with the client and the Dwolla payments API.

Concepts:

- User - The individual users on the platform.
- Transactions - The transactions performed. Should be an immutable record. A ledger.

Proposed Endpoints:

- /user/create - creates a new user. return userId
- /user/:id/delete - permanently deletes a user
- /user/:id/update - updates user info
- /transaction/create - {from: userId, to: userId, amount: INT, date: DATETIME, memo: STRING, interest: DOUBLE}
- /transaction/:id - {status: PENDING|FAILED|SUCCESS|ABORTED, from:, to: amount, date, memo, etc}

More to come

### Table Structure

#### User Table

- id - autoinc - int
- user_name - string - must be an email (verify!)
- password - varchar - bcrypted password
- rating - int
- dwolla info
- nick - string - nickname to be made public

```
CREATE TABLE users (
  user_id integer primary key,

);

CREATE TABLE transaction (
  transaction_id integer primary key,
  user_id integer not null references users(user_id)
);
```

### Endpoints

#### /user/:id (GET)

returns user information

- id
- first name
- last name
- rating
- transaction history
- other?

#### /user/create (POST)

creates a new user

- name
- first name
- last name

#### /user/:id/delete (POST)

permanently deletes a user

- id

#### /transaction/:id (GET)

returns a transaction

- id
- from
- to
- amount
- date
- memo
- status

#### /transaction/:id (UPDATE)

updates a transaction

