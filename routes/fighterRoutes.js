import { Router } from 'express';
import { fighterService } from '../services/fighterService.js';
import { responseMiddleware } from '../middlewares/response.middleware.js';
import {
  createFighterValid,
  updateFighterValid,
} from '../middlewares/fighter.validation.middleware.js';

const router = Router();

// TODO: Implement route controllers for fighter

router.get('/', async (req, res, next) => {
  try {
    const fighters = await fighterService.getAllFighters();
    res.json(fighters);
  } catch (error) {
    next(error);
  }
});

// Get a specific fighter by ID
router.get(
  '/:id',
  async (req, res, next) => {
    try {
      const fighterId = req.params.id;
      const fighter = await fighterService.getFighterById(fighterId);
      res.data = fighter;
    } catch (error) {
      res.err = error;
    } finally {
      next();
    }
  },
  responseMiddleware,
);

// Create a new fighter
router.post(
  '/',
  createFighterValid,
  async (req, res, next) => {
    try {
      const newFighter = req.body;
      const createdFighter = await fighterService.createFighter(newFighter);
      res.data = createdFighter;
    } catch (error) {
      res.err = error;
    } finally {
      next();
    }
  },
  responseMiddleware,
);

// Update a fighter by ID
router.put(
  '/:id',
  updateFighterValid,
  async (req, res, next) => {
    try {
      const fighterId = req.params.id;
      const updatedFighter = await fighterService.updateFighter(
        fighterId,
        req.body,
      );
      res.data = updatedFighter;
    } catch (error) {
      res.err = error;
    } finally {
      next();
    }
  },
  responseMiddleware,
);

// Delete a fighter by ID
router.delete(
  '/:id',
  async (req, res, next) => {
    try {
      const fighterId = req.params.id;
      const deletedFighter = await fighterService.deleteFighter(fighterId);

      res.data = deletedFighter;
    } catch (error) {
      res.err = error;
    } finally {
      next();
    }
  },
  responseMiddleware,
);

export { router };
