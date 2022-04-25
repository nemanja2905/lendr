** Installation Guide from Nemanja

I did it in Windows 10. And If you have questions, please let me know:

0. You have to install VC++/VC# build tools.
I installed Vistual Studio 2015 Enterprise.

1. First of all, you have to install Python 2.*.* (I installed Python 2.7.15 (Amd64))
ref: https://www.python.org/ftp/python/2.7.15/python-2.7.15.amd64.msi
Make sure that python is runnable.
> python
Python 2.7.15 (v2.7.15:ca079a3ea3, Apr 30 2018, 16:30:26) [MSC v.1500 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>>

2. Second add openssl location to Path variable in User Environment Variables.
ref: https://stackoverflow.com/questions/50625283/how-to-install-openssl-in-windows-10
Make sure that openssl is runnable.

3. To install some necessary, open your PowerShell and run the following command:
 npm -g install gyp node-gyp node-pre-gyp knex

4. To run local (Environment : development), please Install postgresql and configure new user app with password appusertest.
ref: https://get.enterprisedb.com/postgresql/postgresql-14.2-2-windows-x64.exe

5. Please open your Powershell and run ./bin/init.sh.
Else, you can run the following command one by one.
# Get dependencies
npm install

# Migrate DB
knex migrate:latest
node INITIALIZE_DB.js

# Start API
npm start

# Start Client app
cd client

npm install
npm start



6.In Next launch,  you can start the project by 

npm run start

If you have any problems, please let me know.



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

