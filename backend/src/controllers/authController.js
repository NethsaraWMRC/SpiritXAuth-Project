import { registerUser, loginUser } from "../services/authService.js";
import { generateRefreshToken } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    await registerUser(username, password);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { accessToken, refreshToken } = await loginUser(username, password);

    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
    res.json({ accessToken, message: "User Login successfully", username });
  } catch (error) {
    // Use statusCode property to set the correct HTTP status code
    if (error.statusCode) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const getRefreshToken = async (req, res) => {
  try {
    const refreshToken = generateRefreshToken(user);
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
