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
  }

  if (!data.lastName || !data.lastName.trim()) {
    errors.lastName = 'Last name is required.';
  }

  if (!data.email || !data.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address (e.g. name@example.com).';
  }

  const rawPhoneDigits = (data.phone || '').replace(/\D/g, '');
  if (!data.phone || !data.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (rawPhoneDigits.length < 10) {
    errors.phone = 'Phone number must contain at least 10 digits.';
  }

  if (!data.password) {
    errors.password = 'Password is required.';
  } else if (data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long.';
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = 'Confirm password is required.';
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
    errors.companyName = 'Company name is required.';
  }

  if (!data.address || !data.address.trim()) {
    errors.address = 'Address is required.';
  }

  if (!data.city || !data.city.trim()) {
    errors.city = 'City is required.';
  }

  const zipValue = (data.zip !== undefined ? data.zip : data.zipCode) || '';
  if (!zipValue || !zipValue.trim()) {
    errors.zip = 'ZIP code is required.';
  } else if (!/^\d+$/.test(zipValue.trim())) {
    errors.zip = 'ZIP code must be numeric.';
  }

  if (!data.taxId || !data.taxId.trim()) {
    errors.taxId = 'Tax ID is required.';
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
