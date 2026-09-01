/**
 * Modular validation rules and step validity checkers for the 6-step form.
 */

// Simple valid email regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate Step 1: Project Details
 */
export const validateStep1 = (data) => {
  const errors = {};

  if (!data.projectName || !data.projectName.trim()) {
    errors.projectName = 'Project name is required.';
  } else if (data.projectName.trim().length < 2) {
    errors.projectName = 'Project name must be at least 2 characters.';
  }

  if (!data.client || !data.client.trim()) {
    errors.client = 'Please select a client.';
  }

  if (!data.startDate) {
    errors.startDate = 'Start date is required.';
  }

  if (!data.endDate) {
    errors.endDate = 'End date is required.';
  }

  if (data.startDate && data.endDate) {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    if (end < start) {
      errors.endDate = 'End date cannot be earlier than start date.';
    }
  }

  return errors;
};

/**
 * Validate Step 2: Project Type & Billing
 */
export const validateStep2 = (data) => {
  const errors = {};

  if (!data.projectType) {
    errors.projectType = 'Please select a billing structure.';
  }

  if (data.projectType === 'Time & Materials') {
    const rate = Number(data.hourlyRate);
    if (!data.hourlyRate || isNaN(rate) || rate <= 0) {
      errors.hourlyRate = 'Please enter a valid hourly rate greater than 0.';
    }
  }

  if (data.projectType === 'Fixed Fee') {
    const budget = Number(data.budget);
    if (!data.budget || isNaN(budget) || budget <= 0) {
      errors.budget = 'Please enter a valid total budget greater than 0.';
    }
  }

  return errors;
};

/**
 * Validate Step 3: Tasks & Deliverables
 */
export const validateStep3 = (data) => {
  const errors = {};

  if (!Array.isArray(data.tasks) || data.tasks.length === 0) {
    errors.tasks = 'Please add at least one deliverable task.';
  }

  return errors;
};

/**
 * Validate Step 4: Team Allocation
 */
export const validateStep4 = (data) => {
  const errors = {};

  if (!Array.isArray(data.team) || data.team.length === 0) {
    errors.team = 'Please assign at least one team member to this project.';
  }

  return errors;
};

/**
 * Validate Step 5: Client & Stakeholder Contacts
 */
export const validateStep5 = (data) => {
  const errors = {};

  if (!data.contactName || !data.contactName.trim()) {
    errors.contactName = 'Client contact name is required.';
  }

  if (!data.contactEmail || !data.contactEmail.trim()) {
    errors.contactEmail = 'Contact email address is required.';
  } else if (!EMAIL_REGEX.test(data.contactEmail.trim())) {
    errors.contactEmail = 'Please enter a valid email address (e.g. name@company.com).';
  }

  if (!data.contactPhone || !data.contactPhone.trim()) {
    errors.contactPhone = 'Contact phone number is required.';
  } else if (data.contactPhone.trim().length < 7) {
    errors.contactPhone = 'Please enter a valid phone number (at least 7 digits).';
  }

  return errors;
};

/**
 * Validate Step 6: Review & Confirmation
 */
export const validateStep6 = (data, completedStepsCount = 0) => {
  const errors = {};
  const isStep1Valid = Object.keys(validateStep1(data)).length === 0;

  if (!isStep1Valid) {
    errors.confirmation = 'Step 1 (Project & Client Info) is mandatory and must be completed.';
  } else if (completedStepsCount < 4) {
    errors.confirmation = `At least 4 steps must be valid to submit (${completedStepsCount}/6 completed).`;
  } else if (!data.isConfirmed) {
    errors.confirmation = 'Please confirm that all project details are correct before submission.';
  }

  return errors;
};

/**
 * Validate a specific step by index (1 to 6)
 */
export const validateStepByIndex = (stepIndex, data, completedStepsCount = 0) => {
  switch (stepIndex) {
    case 1:
      return validateStep1(data);
    case 2:
      return validateStep2(data);
    case 3:
      return validateStep3(data);
    case 4:
      return validateStep4(data);
    case 5:
      return validateStep5(data);
    case 6:
      return validateStep6(data, completedStepsCount);
    default:
      return {};
  }
};

/**
 * Check boolean validity of each step (1 to 6)
 */
export const getStepValidity = (data) => {
  const isStep1Valid = Object.keys(validateStep1(data)).length === 0;
  const isStep2Valid = Object.keys(validateStep2(data)).length === 0;
  const isStep3Valid = Object.keys(validateStep3(data)).length === 0;
  const isStep4Valid = Object.keys(validateStep4(data)).length === 0;
  const isStep5Valid = Object.keys(validateStep5(data)).length === 0;

  const validCountPrior = [isStep1Valid, isStep2Valid, isStep3Valid, isStep4Valid, isStep5Valid].filter(Boolean).length;
  const isStep6Valid = Boolean(data.isConfirmed) && validCountPrior >= 4;

  return {
    1: isStep1Valid,
    2: isStep2Valid,
    3: isStep3Valid,
    4: isStep4Valid,
    5: isStep5Valid,
    6: isStep6Valid,
  };
};

/**
 * Get total count of valid steps (out of 6)
 */
export const getCompletedStepsCount = (stepValidity) => {
  return Object.values(stepValidity).filter(Boolean).length;
};
