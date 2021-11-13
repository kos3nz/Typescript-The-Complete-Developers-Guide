import express from 'express';
import cookieSession from 'cookie-session';
import { AppRouter } from './AppRouter';
import './controllers/LoginController'; // import this file only to initialize it (just running the file, not actually import any bindings).
import './controllers/RootController';

const app = express();

app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(
  cookieSession({
    name: 'cookie-session',
    keys: ['key1'],
    maxAge: 60 * 1000, // 60min
  })
);

app.use(AppRouter.instance);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
