import { User } from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';
import { errorResponse, successResponse } from '../utils/apiResponse.js';

const formatUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
});

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return errorResponse(res, 400, 'Name, email and password are required');
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return errorResponse(res, 409, 'User already exists with this email');
    }

    const user = await User.create({ name, email, password });
    const token = generateToken({ id: user._id });

    return successResponse(res, 201, 'Registration successful', {
      user: formatUser(user),
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, 400, 'Email and password are required');
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      return errorResponse(res, 401, 'Invalid email or password');
    }

    const token = generateToken({ id: user._id });

    return successResponse(res, 200, 'Login successful', {
      user: formatUser(user),
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res) => {
  return successResponse(res, 200, 'Current user fetched', {
    user: formatUser(req.user),
  });
};
