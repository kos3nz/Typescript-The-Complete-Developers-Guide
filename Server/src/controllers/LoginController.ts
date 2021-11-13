import { NextFunction, Request, Response } from 'express';
import { controller, get, post, use, bodyValidator } from './decorators';

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log('Request was made !!!');

  next();
};

@controller('/auth')
class LoginController {
  @get('/login')
  @use(logger)
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form method="POST">
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <button>Submit</button>
      </form>
    `);
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response): void {
    const { email, password } = req.body;

    if (email === 'a@email.com' && password === 'pass') {
      // mark this person as logged in
      req.session = { isLoggedIn: true };
      console.log(req.session);
      // redirect them to the root route
      res.redirect('/');
    } else {
      res.send('Invalid email or password');
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect('/');
  }
}

console.log('LoginController is initiated');
