
const { runQuery } = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('dotenv').config();

const createUser = async (body) => {
  const { password, name, email } = body;

  // Check if user already exists in the database
  const userExistQuery = 'SELECT * FROM users WHERE email = $1';
  const userExistParams = [email];
  const userExistResult = await runQuery(userExistQuery, userExistParams);

  if (userExistResult.length > 0) {
    throw {
      code: 409,
      message: 'User already exists',
      data: null,
      status: 'error',
    };
  }

  // Encrypt password
  const saltRounds = 12;
  const hash = bcrypt.hashSync(password, saltRounds);

  // Insert the new user into the database
  const createUserQuery =
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';
  const createUserParams = [name, email, hash];
  const response = await runQuery(createUserQuery, createUserParams);

  return {
    code: 201,
    status: 'success',
    message: 'New user added successfully',
    data: response[0],
  };
};

const loginUser = async (body) => {
  const { email, password } = body;

  // Check if the user exists in the database
  const findUserQuery = 'SELECT * FROM users WHERE email = $1';
  const findUserParams = [email];
  const user = await runQuery(findUserQuery, findUserParams);

  if (user.length === 0) {
    throw {
      code: 404,
      status: 'error',
      message: 'User not found',
      data: null,
    };
  }

  // Compare user passwords
  const { password: dbPassword, id, name, role } = user[0];
  const userPassword = bcrypt.compareSync(password, dbPassword);

  if (!userPassword) {
    throw {
      code: 400,
      status: 'error',
      message: 'Wrong email and password combination',
      data: null,
    };
  }

  const options = {
    expiresIn: config.JWT_EXPIRES_IN,
  };

  // Generate a token for authentication purposes
  const token = jwt.sign(
    {
      id,
      name,
      email,
      role,
    },
    config.JWT_SECRET,
    options
  );

  return {
    status: 'success',
    message: 'User login successfully',
    code: 200,
    data: {
      id,
      name,
      email,
      role,
      token,
    },
  };
};

module.exports = {
  createUser,
  loginUser,
};
