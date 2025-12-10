import express from 'express';
import db from '../infra/database.ts';
const router = express.Router();

router.get('/', (req, res) =>
  res.json({ message: 'welcome to bloguiery api' }),
);

router.post('/query', async (req, res) => {
  const query = await db.query('select * from "customer"');
  console.log(query);
  res.json({ data: query });
});

router.post('/status', (req, res) => res.json({ status: 'ok' }));

export default router;
