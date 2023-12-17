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
router.get('/:id', async (req, res, next) => {
  try {
    const fighterId = req.params.id;
    const fighter = await fighterService.getFighterById(fighterId);

    if (fighter) {
      res.json(fighter);
    } else {
      res.status(404).json({ error: 'Fighter not found' });
    }
  } catch (error) {
    next(error);
  }
});

// Create a new fighter
router.post('/', createFighterValid, async (req, res, next) => {
  try {
    const newFighter = req.body;
    const createdFighter = await fighterService.createFighter(newFighter);
    res.status(201).json(createdFighter);
  } catch (error) {
    next(error);
  }
});

// Update a fighter by ID
router.put('/:id', updateFighterValid, async (req, res, next) => {
  try {
    const fighterId = req.params.id;
    const updatedFighter = await fighterService.updateFighter(
      fighterId,
      req.body,
    );

    if (updatedFighter) {
      res.json(updatedFighter);
    } else {
      res.status(404).json({ error: 'Fighter not found' });
    }
  } catch (error) {
    next(error);
  }
});

// Delete a fighter by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const fighterId = req.params.id;
    const deletedFighter = await fighterService.deleteFighter(fighterId);

    if (deletedFighter) {
      res.json({ message: 'Fighter deleted successfully' });
    } else {
      res.status(404).json({ error: 'Fighter not found' });
    }
  } catch (error) {
    next(error);
  }
});

// Middleware for handling the response format
router.use(responseMiddleware);

export { router };
