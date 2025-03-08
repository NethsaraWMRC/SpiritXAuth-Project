import User from "../models/user.js";

export const getUserByEmail = async (email) => User.findOne({ email });

export const createUser = async (userData) => {
  const newUser = new User(userData);
  return await newUser.save();
};

export const updateUserRefreshToken = async (email, token) => {
  return await User.findOneAndUpdate(
    { email },
    { refreshToken: token },
    { new: true }
  );
};
