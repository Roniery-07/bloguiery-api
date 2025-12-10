import * as fs from 'fs';

const migrationDirectoryPath = process.cwd() + '/infra/migrations/';

const template = `import type { IConnection } from '../database.ts';

export async function up(connection: IConnection) { }

export async function down(connection: IConnection) { }
`;

function createMigration() {
  const arg = process.argv[2];
  if (arg == '-h' || arg == '--help' || arg?.startsWith('-')) {
    console.log(
      'To utilize this script you must pass the migration name you want to create',
    );
    return;
  }

  const filePath = migrationDirectoryPath.concat(
    '/',
    Date.now().toString(),
    '_',
    arg,
    '.ts',
  );

  fs.writeFile(filePath, template, (err) => {
    if (err) throw err;
    console.log('file created');
  });
}

createMigration();
