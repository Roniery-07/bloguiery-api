import database from '../database';

async function seedDatabase() {
  console.log('creating migration table');
  try {
    await database.query(`CREATE TABLE migrations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        run_on TIMESTAMP NOT NULL
      )`);

    console.log('migration table created!');
  } catch (err) {
    console.log('error: ' + err);
    throw err;
  }
}

await seedDatabase();
