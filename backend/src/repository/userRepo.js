import User from "../models/user.js";

export const getUserByUserName = async (username) => User.findOne({ username });

export const createUser = async (userData) => {
  const newUser = new User(userData);
  return await newUser.save();
};

export const updateUserRefreshToken = async (username, token) => {
  return await User.findOneAndUpdate(
    { username },
    { refreshToken: token },
    { new: true }
  );
};
