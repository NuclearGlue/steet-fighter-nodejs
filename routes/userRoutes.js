import { Router } from 'express';
import { userService } from '../services/userService.js';
import {
  createUserValid,
  updateUserValid,
} from '../middlewares/user.validation.middleware.js';
import { responseMiddleware } from '../middlewares/response.middleware.js';

const router = Router();

// TODO: Implement route controllers for user

router.get('/', async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

// Get a specific user by ID
router.get('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
});

// Create a new user
router.post('/', createUserValid, async (req, res, next) => {
  try {
    const newUser = req.body;
    const createdUser = await userService.createUser(newUser);
    res.status(201).json(createdUser);
  } catch (error) {
    next(error);
  }
});

// Update a user by ID
router.put('/:id', updateUserValid, async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updatedUser = await userService.updateUser(userId, req.body);

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
});

// Delete a user by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    const deletedUser = await userService.deleteUser(userId);

    if (deletedUser) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
});

// Middleware for handling the response format
router.use(responseMiddleware);

export { router };
