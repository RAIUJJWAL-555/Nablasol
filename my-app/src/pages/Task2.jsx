import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import dogHeroImg from '../assets/dog-hero.jpg';
import catRippingImg from '../assets/cat-ripping-transparent.png';
import Task2Stepper from '../components/task2/Task2Stepper';
import Task2Step1Profile from '../components/task2/Task2Step1Profile';
import Task2Step2Business from '../components/task2/Task2Step2Business';
import Task2SuccessView from '../components/task2/Task2SuccessView';
import {
  validateTask2Step1,
  validateTask2Step2,
  validateTask2StepByIndex,
} from '../utils/task2Validation';

const TASK2_STORAGE_KEY = 'task2Data';
const TASK2_STEP_KEY = 'task2Step';

const INITIAL_TASK2_STATE = {
  // Step 1: Profile
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',

  // Step 2: Business Info
  companyName: '',
  address: '',
  city: '',
  zip: '',
  taxId: '',
};

const loadSavedTask2Data = () => {
  try {
    const saved = localStorage.getItem(TASK2_STORAGE_KEY);
    if (!saved) return INITIAL_TASK2_STATE;

    const parsed = JSON.parse(saved);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return {
        ...INITIAL_TASK2_STATE,
        ...parsed,
        zip: parsed.zip !== undefined ? parsed.zip : parsed.zipCode || '',
      };
    }
  } catch {
    // Fallback on corrupt JSON
  }
  return INITIAL_TASK2_STATE;
};

const loadSavedTask2Step = () => {
  try {
    const savedStep = localStorage.getItem(TASK2_STEP_KEY);
    if (savedStep) {
      const parsed = Number(savedStep);
      if (parsed === 1 || parsed === 2) return parsed;
    }
  } catch {
    // Fallback
  }
  return 1;
};

/**
 * Task 2: 2-Step Signup Wizard Page
 */
export default function Task2() {
  const [formData, setFormData] = useState(loadSavedTask2Data);
  const [currentStep, setCurrentStep] = useState(loadSavedTask2Step);
  const [touched, setTouched] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState(null);

  // Derived validation states
  const step1Errors = useMemo(() => validateTask2Step1(formData), [formData]);
  const isStep1Valid = Object.keys(step1Errors).length === 0;

  const currentStepErrors = useMemo(() => {
    return validateTask2StepByIndex(currentStep, formData);
  }, [currentStep, formData]);

  const isCurrentStepValid = Object.keys(currentStepErrors).length === 0;

  // Persist form data to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(TASK2_STORAGE_KEY, JSON.stringify(formData));
      localStorage.setItem(TASK2_STEP_KEY, currentStep.toString());
      setLastSavedTime(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    } catch {
      // LocalStorage quota or privacy mode
    }
  }, [formData, currentStep]);

  // Controlled input change handler
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // OnBlur field touch handler
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    if (name) {
      setTouched((prev) => ({ ...prev, [name]: true }));
    }
  }, []);

  // Step 1 -> Step 2
  const handleNext = () => {
    if (isStep1Valid) {
      setCurrentStep(2);
    } else {
      // Mark all step 1 fields as touched to show errors
      setTouched((prev) => ({
        ...prev,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        password: true,
        confirmPassword: true,
      }));
    }
  };

  // Step 2 -> Step 1
  const handleBack = () => {
    setCurrentStep(1);
  };

  // Stepper direct navigation
  const handleSelectStep = (stepId) => {
    if (stepId === 1) {
      setCurrentStep(1);
    } else if (stepId === 2 && isStep1Valid) {
      setCurrentStep(2);
    } else {
      setTouched((prev) => ({
        ...prev,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        password: true,
        confirmPassword: true,
      }));
    }
  };

  // Clear / Reset Draft
  const handleClearDraft = () => {
    try {
      localStorage.removeItem(TASK2_STORAGE_KEY);
      localStorage.removeItem(TASK2_STEP_KEY);
    } catch {
      // Ignore
    }
    setFormData(INITIAL_TASK2_STATE);
    setTouched({});
    setCurrentStep(1);
    setIsSubmitted(false);
  };

  // Final submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isStep1Valid) {
      setCurrentStep(1);
      setTouched({
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        password: true,
        confirmPassword: true,
      });
      return;
    }

    const step2Errors = validateTask2Step2(formData);
    if (Object.keys(step2Errors).length > 0) {
      setTouched((prev) => ({
        ...prev,
        companyName: true,
        address: true,
        city: true,
        zip: true,
        taxId: true,
      }));
      return;
    }

    // Log full formData to console as required
    console.log('Task 2 Form Submitted:', formData);

    // Success -> Clear draft from localStorage
    try {
      localStorage.removeItem(TASK2_STORAGE_KEY);
      localStorage.removeItem(TASK2_STEP_KEY);
    } catch {
      // Ignore
    }

    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50/60 text-slate-900 antialiased flex flex-col justify-between p-4 sm:p-6 lg:p-8 select-none">
      
      {/* Top Header / Navigation Breadcrumb */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between gap-3 mb-4 select-none">
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-black bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs hover:bg-slate-50 transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Home</span>
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-xs font-bold text-slate-900">Task 2 • Signup Wizard</span>
        </div>

        <Link
          to="/task1"
          className="text-xs font-semibold text-slate-500 hover:text-black transition-colors"
        >
          Go to Task 1 →
        </Link>
      </header>

      {/* Main Wide Card Container: Left Cat + Right Content */}
      <main className="w-full max-w-5xl mx-auto my-auto">
        <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-2xl shadow-slate-200/60 overflow-hidden flex flex-col lg:flex-row items-stretch transition-all">
          
          {isSubmitted ? (
            <div className="w-full p-6 sm:p-10">
              <Task2SuccessView formData={formData} onReset={handleClearDraft} />
            </div>
          ) : (
            <>
              {/* LEFT COLUMN: Cat Only (Peeking/Ripping Through Left Side) */}
              <div className="hidden lg:flex lg:w-5/12 xl:w-5/12 relative items-center justify-center p-6 lg:p-8 bg-gradient-to-br from-slate-100/90 via-white to-slate-50/70 border-r border-slate-100 select-none overflow-hidden flex-shrink-0">
                <div className="relative w-full max-w-sm flex items-center justify-center">
                  <img
                    src={catRippingImg}
                    alt="Cat Peeking"
                    className="w-full h-auto max-h-[1880px] object-contain filter drop-shadow-2xl transition-transform duration-700 hover:scale-105 animate-fade-in select-none pointer-events-none"
                  />
                </div>
              </div>

              {/* RIGHT COLUMN: Form Content */}
              <div className="w-full lg:w-7/12 xl:w-7/12 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
                
                {/* Form Title & Auto-Save Badge */}
                <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3 select-none">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      Business Registration
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Complete your profile and enterprise information.
                    </p>
                  </div>

                  {lastSavedTime && (
                    <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Auto-saved at {lastSavedTime}</span>
                    </div>
                  )}
                </div>

                {/* Stepper */}
                <Task2Stepper
                  currentStep={currentStep}
                  isStep1Valid={isStep1Valid}
                  onSelectStep={handleSelectStep}
                />

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {currentStep === 1 && (
                    <Task2Step1Profile
                      formData={formData}
                      errors={currentStepErrors}
                      touched={touched}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                  )}

                  {currentStep === 2 && (
                    <Task2Step2Business
                      formData={formData}
                      errors={currentStepErrors}
                      touched={touched}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                  )}

                  {/* Bottom Actions Bar */}
                  <div className="pt-5 mt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleBack}
                        disabled={currentStep === 1}
                        className={`h-11 px-5 text-sm font-semibold rounded-xl transition-all ${
                          currentStep === 1
                            ? 'opacity-0 pointer-events-none'
                            : 'bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 border border-slate-200 cursor-pointer shadow-xs'
                        }`}
                      >
                        Back
                      </button>

                      <button
                        type="button"
                        onClick={handleClearDraft}
                        className="text-xs text-slate-400 hover:text-red-600 transition-colors px-2.5 py-2 cursor-pointer font-medium"
                      >
                        Clear Draft
                      </button>
                    </div>

                    {currentStep === 1 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={!isStep1Valid}
                        className={`h-11 px-6 text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 ${
                          !isStep1Valid
                            ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed shadow-none'
                            : 'bg-black hover:bg-slate-800 active:bg-slate-900 text-white cursor-pointer shadow-md hover:shadow-black/20'
                        }`}
                      >
                        <span>Next Step</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={!isCurrentStepValid}
                        className={`h-11 px-7 text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 ${
                          !isCurrentStepValid
                            ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed shadow-none'
                            : 'bg-black hover:bg-slate-800 active:bg-slate-900 text-white cursor-pointer shadow-md hover:shadow-black/20'
                        }`}
                      >
                        <span>Submit</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                    )}
                  </div>
                </form>

              </div>
            </>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto text-center text-xs text-slate-400 select-none mt-6">
        Task 2 • 2-Step Signup Wizard • Controlled State & LocalStorage Persistence
      </footer>

    </div>
  );
}
