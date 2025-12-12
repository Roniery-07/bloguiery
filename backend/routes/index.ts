import express, { Request, Response } from 'express';
import db from '../infra/database.ts';
import { type PostDto } from '@bloguiery/shared';

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

router.get(
  '/post/:slug',
  async (
    req: Request<{ slug: string }>,
    res: Response<PostDto | { error: string }>,
  ) => {
    const data = await db.query('select * from "posts" where "slug" = $1', [
      req.params.slug,
    ]);

    const postRow = data.rows[0] as
      | {
          id: string;
          slug: string;
          title: string;
          body: string;
          status: string;
          created_at: Date;
          updated_at: Date;
        }
      | undefined;

    if (!postRow) {
      return res.status(404).json({
        error: 'Post not found!',
      });
    }

    const response: PostDto = {
      body: postRow.body,
      title: postRow.title,
      createdAt: postRow.created_at,
    } as PostDto;

    res.json(response);
  },
);

export default router;
