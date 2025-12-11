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

router.get('/post/:slug', async (req, res) => {
  const data = await db.query('select * from "posts" where "slug" = $1', [
    req.params.slug,
  ]);

  const response = {
    body: data.rows[0].body,
    title: data.rows[0].title,
    createdAt: data.rows[0].created_at,
  };

  res.json(response);
});

export default router;
