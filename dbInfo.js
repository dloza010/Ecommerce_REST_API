const { Client } = require('pg');
const { DB } = require('./config');

(async () => {

    const products = `
        INSERT INTO products(name, price, description)
        VALUES
        ('flashlight', 24.99, 'for your camping needs'),
        ('backpack', 30.99, 'for your camping needs'),
        ('tent', 49.99, 'for your camping needs'),
        ('boots', 39.99, 'for your camping needs'),
        ('grill', 49.99, 'for your camping needs'),
        ('pocket knife', 14.99, 'for your camping needs'),
        ('portable gas stove', 39.99, 'for your camping needs'),
        ('bike', 119.99, 'for your camping needs'),
        ('matches', 4.99, 'for your camping needs');
    `

    const users = `
        INSERT INTO users(name, username, password, email, address)
        VALUES
        ('david', 'dl1', 'password1', 'david@example.com', '123 st road'),
        ('juan', 'jb1', 'password2', 'juan@example.com', '456 st road'),
        ('felipe', 'fl1', 'password3', 'felipe@example.com', '234 st road'),
        ('pablo', 'pb1', 'password4', 'pablo@example.com', '432 st road'),
        ('cristian', 'cb1', 'password5', 'cristian@example.com', '189 st road');
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
    await db.query(products);
    await db.query(users);

    await db.end();

  } catch(err) {
    console.log("ERROR INSERTING ELEMENTS INTO TABLES: ", err);
  }

})();


