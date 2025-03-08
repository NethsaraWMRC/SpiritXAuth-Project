import { registerUser, loginUser } from "../services/authService.js";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    await registerUser(email, password);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await loginUser(email, password);

    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
    res.json({ accessToken, message: "User Login successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
