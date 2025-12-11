import express from 'express';
import router from './routes';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173'],
  }),
);
app.use(router);

app.listen(3333, () => console.log('server running on port 3333'));
