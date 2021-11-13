import { Request, Response, NextFunction } from 'express';
import { get, controller, use } from './decorators';

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session?.isLoggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send('Not permitted');
}

@controller('')
class RootController {
  @get('/')
  getRoot(req: Request, res: Response) {
    if (req.session?.isLoggedIn) {
      res.send(`
      <div>
        <h1>You are logged in</h1>
        <div>
          <a href="/protected">Go to protected page</a>
        </div>
        <div>
          <a href="/auth/logout">Logout</a>
        </div>
      </div>
    `);
    } else {
      res.send(`
      <div>
        <h1>You are not logged in</h1>
        <a href="/auth/login">Login</a>
      </div>
    `);
    }
  }

  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send(`
    <div>
      <h1>Welcome to protected route, logged in user</h1>
      <a href="/logout">Logout</a>
    </div>
    `);
  }
}
