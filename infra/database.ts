import { Client, type ClientConfig, type QueryResult } from 'pg';

const configuration = {
  user: 'local_user',
  host: 'localhost',
  database: 'local_database',
  password: 'local_password',
  port: 5432,
} satisfies ClientConfig;

async function query(query: string, values?: string[]): Promise<QueryResult> {
  let client;

  try {
    client = new Client(configuration);
    console.log('executing query');
    client.connect();
    const data = await client.query(query, values);
    return data;
  } catch (err) {
    console.error('error: ' + err);
    throw err;
  } finally {
    if (client) client.end();
  }
}

export interface IConnection {
  query(text: string, values?: string[]): Promise<QueryResult>;
}

export default Object.freeze({
  query,
} as IConnection);
