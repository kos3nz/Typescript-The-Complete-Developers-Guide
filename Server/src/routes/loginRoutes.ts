import { Router, Request, Response, NextFunction } from 'express';

// RequestWithBody is going to have all tha same properties as Request
// but has a overridden version of the body property
interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session?.isLoggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send('Not permitted');
}

const router = Router();

router.get('/login', (req: Request, res: Response) => {
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
});

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  if (email && password && email === 'a@email.com' && password === 'pass') {
    // mark this person as logged in
    req.session = { isLoggedIn: true };
    console.log(req.session);
    // redirect them to the root route
    res.redirect('/');
  } else {
    res.send('Invalid email or password');
  }
});

router.get('/', (req: Request, res: Response) => {
  if (req.session?.isLoggedIn) {
    res.send(`
    <div>
      <h1>You are logged in</h1>
      <div>
        <a href="/protected">Go to protected page</a>
      </div>
      <div>
        <a href="/logout">Logout</a>
      </div>
    </div>
  `);
  } else {
    res.send(`
    <div>
      <h1>You are not logged in</h1>
      <a href="/login">Login</a>
    </div>
  `);
  }
});

router.get('/logout', (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect('/');
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send(`
  <div>
    <h1>Welcome to protected route, logged in user</h1>
    <a href="/logout">Logout</a>
  </div>
  `);
});

export { router };
