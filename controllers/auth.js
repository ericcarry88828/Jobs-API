const status = require('statuses');
const { BadRequestError, UnauthenticatedError } = require('../errors/index');
const User = require('../models/user');

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(status('Created')).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // if (!email || !password) {
  //   throw new BadRequestError('Please provide email and password');
  // }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const token = user.createJWT();
  res.status(status('OK')).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};
