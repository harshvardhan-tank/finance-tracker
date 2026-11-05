import jwt from "jsonwebtoken";
import User from "../models/User.js";

const createToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

const userResponse = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
});

// POST /api/auth/register
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in name, email and password" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(400).json({ message: "This email is already registered" });

    const user = await User.create({ name, email, password });
    res.status(201).json({ user: userResponse(user), token: createToken(user._id) });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter email and password" });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({ user: userResponse(user), token: createToken(user._id) });
  } catch (error) {
    next(error);
  }
};

// GET /api/auth/me  (protected)
export const getMe = async (req, res) => {
  res.json({ user: userResponse(req.user) });
};
