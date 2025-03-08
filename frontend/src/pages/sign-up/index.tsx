import React, { useState, useEffect } from "react";

const Signup: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string; terms?: string }>({});

    useEffect(() => {
        validateEmail();
    }, [email]);

    useEffect(() => {
        validatePassword();
    }, [password]);

    useEffect(() => {
        validateConfirmPassword();
    }, [confirmPassword]);

    const validateEmail = () => {
        let emailError = "";
        if (!email) {
            emailError = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            emailError = "Enter a valid email address.";
        }
        setErrors((prevErrors) => ({ ...prevErrors, email: emailError }));
    };

    const validatePassword = () => {
        let passwordError = "";
        if (!password) {
            passwordError = "Password is required.";
        } else if (password.length < 6) {
            passwordError = "Password must be at least 6 characters.";
        }
        setErrors((prevErrors) => ({ ...prevErrors, password: passwordError }));
    };

    const validateConfirmPassword = () => {
        let confirmPasswordError = "";
        if (!confirmPassword) {
            confirmPasswordError = "Confirm Password is required.";
        } else if (password !== confirmPassword) {
            confirmPasswordError = "Passwords do not match.";
        }
        setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: confirmPasswordError }));
    };

    const validateForm = () => {
        validateEmail();
        validatePassword();
        validateConfirmPassword();
        return !errors.email && !errors.password && !errors.confirmPassword;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form Submitted", { email, password });
            // Proceed with submission (e.g., API call)
        } 
    };

    return (
        <section className="bg-gray-50 ">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <div className="text-md font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Sign up</div>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onBlur={validateEmail}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onBlur={validatePassword}
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                            </div>

                            <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
                                <input
                                    type="password"
                                    name="confirm-password"
                                    id="confirm-password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    onBlur={validateConfirmPassword}
                                />
                                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Create an account
                            </button>
                            <p className="text-sm font-light text-gray-500">
                                Already have an account? <a href="/" className="font-medium text-primary-600 hover:underline">Login here</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Signup;
