import { USER } from '../models/user.js';
import { userService } from '../services/userService.js';

const phoneSchema = /^\+380[0-9]{9}$/;
const passwordSchema = /^[0-9a-zA-Z]{7,32}$/;
const nameSchema = /^[aA-zZ\s]+$/;
const emailSchema = /^[a-zA-Z0-9._-]+@gmail\.com$/;

const createUserValid = async (req, res, next) => {
  const users = await userService.getAllUsers();
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  if (Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ error: true, message: 'Body cannot be empty!' });
  }

  if (!isSubset(Object.keys(USER), Object.keys(req.body))) {
    return res
      .status(400)
      .json({ error: true, message: 'No extra fields allowed!' });
  }

  if (Object.keys(req.body).some(key => key === 'id')) {
    return res
      .status(400)
      .json({ error: true, message: 'Id is not allowed in body' });
  }

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

  if (users.some(user => user.email === email)) {
    return res.status(400).json({
      error: true,
      message: 'This email already registred',
    });
  } else if (users.some(user => user.phoneNumber === phoneNumber)) {
    return res.status(400).json({
      error: true,
      message: 'This phone number already registred',
    });
  }

  next();
};

function isSubset(userModel, reqBody) {
  return reqBody.every(bodyKey =>
    userModel.some(modelKey => bodyKey === modelKey),
  );
}

const updateUserValid = async (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  const users = await userService.getAllUsers();
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  if (Object.values(req.body).some(value => value === '')) {
    return res.status(400).json({
      error: true,
      message: 'At least one field must be filled',
    });
  }

  if (email && !emailSchema.test(email)) {
    return res.status(400).json({
      error: true,
      message: 'Email must be only of @gmail.com domain',
    });
  }
  if (phoneNumber && !phoneSchema.test(phoneNumber)) {
    return res.status(400).json({
      error: true,
      message: 'Phone number must be of format +380XXXXXXXXX',
    });
  }
  if (password && password.length < 3) {
    return res.status(400).json({
      error: true,
      message: 'Password must be at least 3 symbols long',
    });
  }

  if (users.some(user => user.email === email)) {
    return res.status(400).json({
      error: true,
      message: 'This email already registred',
    });
  } else if (users.some(user => user.phoneNumber === phoneNumber)) {
    return res.status(400).json({
      error: true,
      message: 'This phone number already registred',
    });
  }
  next();
};

export { createUserValid, updateUserValid };
