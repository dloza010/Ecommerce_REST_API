const { Client } = require('pg');
const { DB } = require('./config');

(async () => {

    const products = `
        INSERT INTO product(productid, name, price, description)
        VALUES
        (1, 'flashlight', 50, 'for your camping needs'),
        (2, 'backpack', 50, 'for your camping needs'),
        (3, 'tent', 50, 'for your camping needs'),
        (4, 'boots', 50, 'for your camping needs'),
        (5, 'grill', 50, 'for your camping needs'),
        (7, 'pocket knife', 50, 'for your camping needs'),
        (8, 'portable gas stove', 50, 'for your camping needs'),
        (9, 'bike', 50, 'for your camping needs'),
        (10, 'matches', 50, 'for your camping needs');
    // `

    const users = `
        INSERT INTO users(userId, name, username, password, email, address)
        VALUES
        (1, 'david', 'dl1', 'password1', 'david@example.com', '123 st road'),
        (2, 'juan', 'jb1', 'password2', 'juan@example.com', '456 st road'),
        (3, 'felipe', 'fl1', 'password3', 'felipe@example.com', '234 st road'),
        (4, 'pablo', 'pb1', 'password4', 'pablo@example.com', '432 st road'),
        (5, 'cristian', 'cb1', 'password5', 'cristian@example.com', '189 st road');
    `

  try {
    const db = new Client({
      user: DB.PGUSER,
      host: DB.PGHOST,
      database: DB.PGDATABASE,
      password: DB.PGPASSWORD,
      port: DB.PGPORT
    });

    await db.connect();

    // Create tables on database
    // await db.query(products);
    await db.query(users);

    await db.end();

  } catch(err) {
    console.log("ERROR INSERTING ELEMENTS INTO TABLES: ", err);
  }

})();


