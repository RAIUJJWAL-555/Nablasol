/**
 * Validation rules for Task 2 (2-Step Signup Wizard).
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/;

/**
 * Validate Step 1: Personal Profile
 */
export const validateTask2Step1 = (data) => {
  const errors = {};

  if (!data.firstName || !data.firstName.trim()) {
    errors.firstName = 'First name is required.';
  } else if (data.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters.';
  }

  if (!data.lastName || !data.lastName.trim()) {
    errors.lastName = 'Last name is required.';
  } else if (data.lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters.';
  }

  if (!data.email || !data.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address (e.g. name@company.com).';
  }

  if (!data.phone || !data.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!PHONE_REGEX.test(data.phone.trim()) || data.phone.replace(/\D/g, '').length < 7) {
    errors.phone = 'Please enter a valid phone number (at least 7 digits).';
  }

  if (!data.password) {
    errors.password = 'Password is required.';
  } else if (data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long.';
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.';
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
};

/**
 * Validate Step 2: Business Info
 */
export const validateTask2Step2 = (data) => {
  const errors = {};

  if (!data.companyName || !data.companyName.trim()) {
    errors.companyName = 'Company / Legal Business name is required.';
  } else if (data.companyName.trim().length < 2) {
    errors.companyName = 'Company name must be at least 2 characters.';
  }

  if (!data.address || !data.address.trim()) {
    errors.address = 'Street address is required.';
  } else if (data.address.trim().length < 3) {
    errors.address = 'Please enter a valid physical street address.';
  }

  if (!data.city || !data.city.trim()) {
    errors.city = 'City is required.';
  } else if (data.city.trim().length < 2) {
    errors.city = 'City name must be at least 2 characters.';
  }

  if (!data.zipCode || !data.zipCode.trim()) {
    errors.zipCode = 'ZIP / Postal code is required.';
  } else if (data.zipCode.trim().length < 3) {
    errors.zipCode = 'Please enter a valid ZIP / Postal code.';
  }

  if (!data.taxId || !data.taxId.trim()) {
    errors.taxId = 'Tax ID / EIN / Business Registration is required.';
  } else if (data.taxId.trim().length < 3) {
    errors.taxId = 'Please enter a valid Tax ID / Registration number.';
  }

  return errors;
};

/**
 * Helper to validate by step index
 */
export const validateTask2StepByIndex = (stepIndex, data) => {
  if (stepIndex === 1) return validateTask2Step1(data);
  if (stepIndex === 2) return validateTask2Step2(data);
  return {};
};
