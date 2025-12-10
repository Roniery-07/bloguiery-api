import * as fs from 'fs';
import database from '../database.ts';
import path from 'path';

const migrationsDir = path.resolve(process.cwd(), 'infra', 'migrations');

async function applyMigrations() {
  try {
    const files = fs.readdirSync(migrationsDir);
    files.sort();

    for (const file of files) {
      if (!file.endsWith('.ts') && !file.endsWith('.js')) continue;

      const migrationName = file.split('.')[0];

      console.log(`Checking migration: ${migrationName}`);

      if (await isMigrationApplied(migrationName)) {
        console.log(`Skipping ${migrationName} (already applied)`);
        continue;
      }

      console.log(`Importing migration: ${file}`);

      const filePath = path.join(migrationsDir, file);
      const migration = await import(filePath);

      console.log('Running migration up()...');

      await migration.up(database);

      console.log(`Migration ${migrationName} finished, saving migration log`);
      await saveMigrationLog(migrationName);
    }
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

async function isMigrationApplied(migrationName: string) {
  const result = await database.query(
    `SELECT * FROM "migrations" WHERE name = $1`,
    [migrationName],
  );

  return result.rowCount !== 0;
}

async function saveMigrationLog(migrationName: string): Promise<void> {
  await database.query(
    `insert into "migrations" (name, run_on) values ($1, NOW())`,
    [migrationName],
  );
}

await applyMigrations();
