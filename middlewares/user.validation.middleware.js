import { USER } from '../models/user.js';

const phoneSchema = /^\+380[0-9]{9}$/;
const passwordSchema = /^[0-9a-zA-Z]{7,32}$/;
const nameSchema = /^[aA-zZ\s]+$/;
const emailSchema = /^[a-zA-Z0-9._-]+@gmail\.com$/;

const createUserValid = (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  if (
    firstName === '' ||
    lastName === '' ||
    email === '' ||
    phoneNumber === '' ||
    password === ''
  ) {
    return res
      .status(400)
      .json({ error: true, message: 'All fields must be filled' });
  }
  if (!emailSchema.test(email)) {
    return res.status(400).json({
      error: true,
      message: 'Email must be only of @gmail.com domain',
    });
  }
  if (!phoneSchema.test(phoneNumber)) {
    return res.status(400).json({
      error: true,
      message: 'Phone number must be of format +380XXXXXXXXX',
    });
  }
  if (password.length < 3) {
    return res.status(400).json({
      error: true,
      message: 'Password must be at least 3 symbols long',
    });
  }

  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  const { firstName, lastName, email, phoneNumber, password } = req.body;
  if (
    firstName === '' &&
    lastName === '' &&
    email === '' &&
    phoneNumber === '' &&
    password === ''
  ) {
    return res
      .status(400)
      .json({ error: true, message: 'At least one field must be filled' });
  }
  next();
};

export { createUserValid, updateUserValid };
