import bcrypt from "bcryptjs";
import {
  getUserByEmail,
  createUser,
  updateUserRefreshToken,
} from "../repository/userRepo.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/tokenUtils.js";

//registration

export const registerUser = async (email, password) => {
  const existingUser = await getUserByEmail(email);
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  return await createUser({ email, password: hashedPassword });
};

//login
export const loginUser = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await updateUserRefreshToken(email, refreshToken);
  return { accessToken, refreshToken };
};
