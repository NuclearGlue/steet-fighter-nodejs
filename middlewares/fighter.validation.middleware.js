import { FIGHTER } from '../models/fighter.js';

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during creation
  const { name, health, power, defense } = req.body;
  if (name === '' || health === '' || power === '' || defense === '') {
    return res
      .status(400)
      .json({ error: true, message: 'All fields must be filled' });
  }

  if (typeof power !== 'number' || !(power >= 1) || !(power <= 100)) {
    return res.status(400).json({
      error: true,
      message: 'Power must be a number from 1 to 100',
    });
  }
  if (typeof health !== 'number' || !(health >= 1) || !(health <= 120)) {
    return res.status(400).json({
      error: true,
      message: 'Health must be a number from 1 to 120',
    });
  }
  if (typeof defense !== 'number' || !(defense >= 1) || !(defense <= 10)) {
    return res.status(400).json({
      error: true,
      message: 'Defense must be a number from 1 to 10',
    });
  }

  next();
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update
  const { name, health, power, defense } = req.body;

  if (name === '' && health === '' && power === '' && defense === '') {
    return res
      .status(400)
      .json({ error: true, message: 'At least one field must be filled' });
  }

  if (
    (power && typeof power !== 'number') ||
    !(power >= 1) ||
    !(power <= 100)
  ) {
    return res.status(400).json({
      error: true,
      message: 'Power must be a number from 1 to 100',
    });
  }
  if (
    (health && typeof health !== 'number') ||
    !(health >= 1) ||
    !(health <= 120)
  ) {
    return res.status(400).json({
      error: true,
      message: 'Health must be a number from 1 to 120',
    });
  }
  if (
    (defense && typeof defense !== 'number') ||
    !(defense >= 1) ||
    !(defense <= 10)
  ) {
    return res.status(400).json({
      error: true,
      message: 'Defense must be a number from 1 to 10',
    });
  }

  next();
};

export { createFighterValid, updateFighterValid };
