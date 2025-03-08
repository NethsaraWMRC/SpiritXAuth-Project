///////// Helper functions for username validation

// Check if a username has valid characters (letters, numbers, underscore, hyphen)
export const hasValidUserNameCharacters = (userName: string): boolean => {
  const validUserNamePattern = /^[a-zA-Z0-9_-]+$/;
  return validUserNamePattern.test(userName);
};

// Check if username | password has minimum required length
export const hasMinimumInputLength = (text: string, minLength = 8): boolean => {
  return text.length >= minLength;
};

// Check if username | password is within maximum allowed length
export const hasValidMaximumInputLength = (
  text: string,
  maxLength = 20
): boolean => {
  return text.length <= maxLength;
};

// Check if username doesn't start with invalid characters
export const hasValidStart = (userName: string): boolean => {
  return !userName.startsWith("_") && !userName.startsWith("-");
};

// Check if username doesn't end with invalid characters
export const hasValidEnd = (userName: string): boolean => {
  return !userName.endsWith("_") && !userName.endsWith("-");
};

/*
 * Validates if a userName meets the required criteria
 * Must be 8-30 characters long
 * Can only contain letters, numbers, underscores, and hyphens
 * Cannot start with a hyphen or underscore
 * Cannot end with a hyphen or underscore
 */
export const validateUserName = (
  userName: string
): { isValid: boolean; message?: string } => {
  if (!userName || userName.trim() === "") {
    return { isValid: false, message: "User name is required" };
  }

  if (!hasMinimumInputLength(userName)) {
    return {
      isValid: false,
      message: "User name must be at least 8 characters long",
    };
  }

  if (!hasValidMaximumInputLength(userName)) {
    return { isValid: false, message: "Username cannot exceed 20 characters" };
  }

  if (!hasValidUserNameCharacters(userName)) {
    return {
      isValid: false,
      message:
        "User name can only contain letters, numbers, underscores and hyphens",
    };
  }

  if (!hasValidStart(userName)) {
    return {
      isValid: false,
      message: "Username cannot start with an underscore or hyphen",
    };
  }

  if (!hasValidEnd(userName)) {
    return {
      isValid: false,
      message: "Username cannot end with an underscore or hyphen",
    };
  }

  return { isValid: true };
};

///For real-time validation - display error messages when user typing

export const validateUsernameInput = (
  userName: string
): { isValid: boolean; message: string } => {
  if (!userName) {
    return { isValid: false, message: "" };
  }

  if (!hasValidUserNameCharacters(userName)) {
    return {
      isValid: false,
      message: "Only letters, numbers, underscore and hyphens allowed",
    };
  }

  if (!hasMinimumInputLength(userName)) {
    return { isValid: false, message: "Keep typing... (min 8 characters)" };
  }

  if (!hasValidMaximumInputLength(userName)) {
    return {
      isValid: false,
      message: "Username is too long (max 30 characters)",
    };
  }

  if (!hasValidStart(userName)) {
    return {
      isValid: false,
      message: "Username cannot start with an underscore or hyphen",
    };
  }

  if (!hasValidEnd(userName)) {
    return {
      isValid: false,
      message: "Username cannot end with an underscore or hyphen",
    };
  }

  return { isValid: true, message: "Username looks good!" };
};

///////// Helper functions for password validation

// Check if password has at least one lowercase letter
export const hasLowercase = (password: string): boolean => {
  return /[a-z]/.test(password);
};

// Check if password has at least one uppercase letter
export const hasUppercase = (password: string): boolean => {
  return /[A-Z]/.test(password);
};

// Check if password has at least one special character
export const hasSpecialCharacter = (password: string): boolean => {
  return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
};

/**
 * Validates if a password meets the required criteria
 * - At least 8 characters long
 * - Contains at least one lowercase letter
 * - Contains at least one uppercase letter
 * - Contains at least one special character
 */
export const validatePassword = (
  password: string
): { isValid: boolean; message?: string } => {
  if (!password) {
    return { isValid: false, message: "Password is required" };
  }

  // Reusing the existing length validation function
  if (!hasMinimumInputLength(password)) {
    return {
      isValid: false,
      message: "Password must be at least 8 characters long",
    };
  }

  if (!hasLowercase(password)) {
    return {
      isValid: false,
      message: "Password must contain at least one lowercase letter",
    };
  }

  if (!hasUppercase(password)) {
    return {
      isValid: false,
      message: "Password must contain at least one uppercase letter",
    };
  }

  if (!hasSpecialCharacter(password)) {
    return {
      isValid: false,
      message: "Password must contain at least one special character",
    };
  }

  return { isValid: true };
};

// For real-time password validation when user typing

export const validatePasswordInput = (
  password: string
): { isValid: boolean; message: string; strengthLevel: number } => {
  if (!password) {
    return { isValid: false, message: "", strengthLevel: 0 };
  }

  // Calculate password strength (0-4)
  let strengthLevel = 0;

  if (password.length >= 8) strengthLevel++;
  if (hasLowercase(password)) strengthLevel++;
  if (hasUppercase(password)) strengthLevel++;
  if (hasSpecialCharacter(password)) strengthLevel++;

  // Check each requirement individually
  const missing = [];

  if (!hasMinimumInputLength(password)) {
    missing.push("8+ characters");
  }

  if (!hasLowercase(password)) {
    missing.push("lowercase letter");
  }

  if (!hasUppercase(password)) {
    missing.push("uppercase letter");
  }

  if (!hasSpecialCharacter(password)) {
    missing.push("special character");
  }

  // Provide helpful message based on missing requirements
  if (missing.length > 0) {
    return {
      isValid: false,
      message: `Add ${missing.join(", ")}`,
      strengthLevel,
    };
  }

  // Message based on strength
  let message = "Password acceptable";
  if (strengthLevel === 4) {
    message = "Strong password!";
  }

  return { isValid: true, message, strengthLevel };
};

//Validates if confirm password matches the password

export const validatePasswordMatch = (
  password: string,
  confirmPassword: string
): { isValid: boolean; message?: string } => {
  if (!confirmPassword) {
    return { isValid: false, message: "Please confirm your password" };
  }

  if (password !== confirmPassword) {
    return { isValid: false, message: "Passwords do not match" };
  }

  return { isValid: true };
};

// For real-time confirm password validation

export const validateConfirmPasswordInput = (
  password: string,
  confirmPassword: string
): { isValid: boolean; message: string } => {
  if (!confirmPassword) {
    return { isValid: false, message: "" };
  }

  if (password !== confirmPassword) {
    return { isValid: false, message: "Passwords do not match" };
  }

  return { isValid: true, message: "Passwords match" };
};
