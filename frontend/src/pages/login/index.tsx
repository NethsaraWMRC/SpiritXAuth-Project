import React, { useState } from "react";
import {
  validateLoginUsername,
  validateLoginPassword,
} from "../../util/validation";
import { loginUser } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    general?: string;
  }>({});

  const { login } = useAuth();
  const navigate = useNavigate();

  // Handle username changes
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (errors.username) setErrors((prev) => ({ ...prev, username: "" }));
  };

  // Handle password changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
  };

  // Validate username
  const validateUsername = () => {
    const validation = validateLoginUsername(username);
    setErrors((prevErrors) => ({
      ...prevErrors,
      username: validation.isValid ? "" : validation.message,
    }));
    return validation.isValid;
  };

  // Validate password
  const validatePassword = () => {
    const validation = validateLoginPassword(password);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: validation.isValid ? "" : validation.message,
    }));
    return validation.isValid;
  };

  // Validate form before submission
  const validateForm = () => {
    return validateUsername() && validatePassword();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await loginUser(username, password);

        if (response && response.data.accessToken) {
          login(response?.data?.accessToken, response?.data?.username);
          console.log("User logged in successfully!");
          navigate("/");
        } else {
          setErrors((prev) => ({
            ...prev,
            general: "Username or Password is incorrect",
          }));
        }
      } catch (error) {
        console.error("Login error:", error);
        setErrors((prev) => ({
          ...prev,
          general: "Username or Password is incorrect",
        }));
      }
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="text-md font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Login
            </div>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter your username"
                  value={username}
                  onChange={handleUsernameChange}
                  onBlur={validateUsername}
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={validatePassword}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {errors.general && (
                <p className="text-red-500 text-xs mb-2 text-center">
                  {errors.general}
                </p> // Display general error message above CTA button
              )}

              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Login
              </button>
              <p className="text-sm font-light text-gray-500">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign up here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
