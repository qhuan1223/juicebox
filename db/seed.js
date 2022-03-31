const { client, getAllUsers, createUser } = require('./index');


async function dropTables() { // delete and refresh table
    try{
        await client.query(`
            DROP TABLE IF EXISTS users;
        `);
    } catch(error) {
        console.error("Error dropping tables!");
        throw error;
    }
}

async function createTables() { // create new table
    try {
        await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username varchar(255) UNIQUE,
                password varchar(255) NOT NULL,
                name varchar(255) NOT NULL,
                location varchar(255)
            );
        `);
    } catch (error) {
        console.error("Error building tables!");
        throw error; 
    }
}

async function createInitialUsers() {
    try {
  
      const albert = await createUser({ username: 'albert', password: 'bertie99' });
      const sandra = await createUser({username: 'sandra', password:'2sandy4me'});
      const glamgal = await createUser({username:'glamgak', password:'soglam'});

    } catch(error) {
    
      throw error;
    }
  }
  

async function testDB() {
    try {
      console.log("Starting to test database...");
  
      const users = await getAllUsers();
      console.log("getAllUsers:", users);
  
      console.log("Finished database tests!");
    } catch (error) {
      console.error("Error testing database!");
      throw error;
    }
};

async function rebuildDB() { // reconstruct everything 
    try {
        client.connect();
        await dropTables();
        await createTables();
        await createInitialUsers();
    } catch (error) {
        console.error(error);
    }
}


rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());