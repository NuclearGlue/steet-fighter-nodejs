import { Router } from 'express';
import { userService } from '../services/userService.js';
import {
  createUserValid,
  updateUserValid,
} from '../middlewares/user.validation.middleware.js';
import { responseMiddleware } from '../middlewares/response.middleware.js';

const router = Router();

// TODO: Implement route controllers for user

router.get(
  '/',
  async (req, res, next) => {
    try {
      const users = await userService.getAllUsers();
      res.data = users;
    } catch (error) {
      res.err = error;
    } finally {
      next();
    }
  },
  responseMiddleware,
);

// Get a specific user by ID
router.get(
  '/:id',
  async (req, res, next) => {
    try {
      const userId = req.params.id;
      const user = await userService.getUserById(userId);
      res.data = user;
    } catch (error) {
      res.err = error;
    } finally {
      next();
    }
  },
  responseMiddleware,
);

// Create a new user
router.post(
  '/',
  createUserValid,
  async (req, res, next) => {
    try {
      const newUser = req.body;
      const createdUser = await userService.createUser(newUser);
      res.data = createdUser;
    } catch (error) {
      res.err = error;
    } finally {
      next();
    }
  },
  responseMiddleware,
);

// Update a user by ID
router.put(
  '/:id',
  updateUserValid,
  async (req, res, next) => {
    try {
      const userId = req.params.id;
      const updatedUser = await userService.updateUser(userId, req.body);
      res.data = updatedUser;
    } catch (error) {
      res.err = error;
    } finally {
      next();
    }
  },
  responseMiddleware,
);

// Delete a user by ID
router.delete(
  '/:id',
  async (req, res, next) => {
    try {
      const userId = req.params.id;
      const deletedUser = await userService.deleteUser(userId);
      res.data = deletedUser;
    } catch (error) {
      res.err = error;
    } finally {
      next();
    }
  },
  responseMiddleware,
);

export { router };
