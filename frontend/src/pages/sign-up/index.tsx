import React, { useState, useEffect } from "react";
import {
  validateUserName,
  validateUsernameInput,
  validatePassword,
  validatePasswordInput,
  validatePasswordMatch,
  validateConfirmPasswordInput,
} from "../../util/validation";
import { registerUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Signup: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [errors, setErrors] = useState<{
    userName?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  }>({});

  const navigate = useNavigate();

  // Validate username as user types
  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserName(value);

    const { isValid, message } = validateUsernameInput(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      userName: isValid ? "" : message,
    }));
  };

  // Password validation
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    const { isValid, message, strengthLevel } = validatePasswordInput(value);
    setPasswordStrength(strengthLevel);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: isValid ? "" : message,
    }));

    // Also validate confirm password if it exists
    if (confirmPassword) {
      const confirmResult = validateConfirmPasswordInput(
        value,
        confirmPassword
      );
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: confirmResult.isValid ? "" : confirmResult.message,
      }));
    }
  };

  // Confirm password validation
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);

    const { isValid, message } = validateConfirmPasswordInput(password, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      confirmPassword: isValid ? "" : message,
    }));
  };

  useEffect(() => {
    validateUserName(userName);
  }, [userName]);

  // Validate form on submission
  const validateForm = () => {
    // Username validation
    const userNameValidation = validateUserName(userName);
    if (!userNameValidation.isValid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        userName: userNameValidation.message,
      }));
      return false;
    }

    // Password validation
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: passwordValidation.message,
      }));
      return false;
    }

    // Confirm password validation
    const confirmValidation = validatePasswordMatch(password, confirmPassword);
    if (!confirmValidation.isValid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: confirmValidation.message,
      }));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Submitted", { userName, password });
      // Proceed with submission (e.g., API call)

      try {
        const res = await registerUser(userName, password);

        console.log(res);
        Swal.fire({
          title: 'Success!',
          text: 'Your account has been created successfully',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        }).then(() => {
          navigate("/login");
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  // Render password strength indicator
  const renderPasswordStrength = () => {
    if (!password) return null;

    const levels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    const colors = ["#ff4d4d", "#ffaa00", "#ffff00", "#bbff00", "#00cc44"];

    return (
      <div className="mt-1">
        <div className="h-1 w-full bg-gray-200 rounded-full">
          <div
            className="h-1 rounded-full"
            style={{
              width: `${passwordStrength * 25}%`,
              backgroundColor: colors[passwordStrength],
            }}
          />
        </div>
        <p className="text-xs mt-1 text-gray-600">{levels[passwordStrength]}</p>
      </div>
    );
  };
  return (
    <section className="bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full border bg-gray-800 border-gray-700 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="text-md font-bold leading-tight tracking-tight text-white md:text-2xl">
              Sign up
            </div>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  User Name
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="User Name"
                  value={userName}
                  onChange={handleUserNameChange}
                />
                {errors.userName && (
                  <p className="text-red-500 text-xs mt-1">{errors.userName}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
                {renderPasswordStrength()}
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-300">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
