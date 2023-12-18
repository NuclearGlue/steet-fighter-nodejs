import { Router } from 'express';
import { authService } from '../services/authService.js';
import { responseMiddleware } from '../middlewares/response.middleware.js';

const router = Router();

router.post(
  '/login',
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await userService.getUserByCredentials(email, password);

      if (!user) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }
      res.data = user;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware,
);

export { router };
