import type { IConnection } from '../database.ts';

export async function up(connection: IConnection) {
  await connection.query(`
    CREATE TABLE posts (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      slug VARCHAR(256) NOT NULL,
      title VARCHAR(256),
      body TEXT NOT NULL CHECK (length(body) <= 20000),
      status VARCHAR NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
      source_url VARCHAR(2000),
      published_at TIMESTAMP WITH TIME ZONE,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() AT TIME ZONE 'utc'),
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() AT TIME ZONE 'utc'),

      CONSTRAINT posts_slug_unique UNIQUE (slug)
    );
  `);
  console.log('Tabela posts criada com sucesso.');
}

export async function down(connection: IConnection) {
  await connection.query(`DROP TABLE IF EXISTS posts;`);
  console.log('Tabela posts removida.');
}
