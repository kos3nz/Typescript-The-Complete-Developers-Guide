import express, { Request, Response } from 'express';
import cookieSession from 'cookie-session';
import { router } from './routes/loginRoutes';

const app = express();

app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(
  cookieSession({ name: 'cookie-session', keys: ['key1'], maxAge: 60 * 1000 })
); // 60mins

app.use(router);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
