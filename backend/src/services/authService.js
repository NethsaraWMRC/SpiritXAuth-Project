import bcrypt from "bcryptjs";
import {
  getUserByUserName,
  createUser,
  updateUserRefreshToken,
} from "../repository/userRepo.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/tokenUtils.js";

//registration

export const registerUser = async (username, password) => {
  const existingUser = await getUserByUserName(username);
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  return await createUser({ username, password: hashedPassword });
};

//login
export const loginUser = async (username, password) => {
  const user = await getUserByUserName(username);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await updateUserRefreshToken(username, refreshToken);
  return { accessToken, refreshToken };
};
