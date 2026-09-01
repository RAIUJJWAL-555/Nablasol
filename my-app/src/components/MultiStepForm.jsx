import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Stepper, { STEPS_CONFIG } from './common/Stepper';
import Step1ProjectDetails from './steps/Step1ProjectDetails';
import Step2ProjectType from './steps/Step2ProjectType';
import Step3Tasks from './steps/Step3Tasks';
import Step4Team from './steps/Step4Team';
import Step5ClientContact from './steps/Step5ClientContact';
import Step6Review from './steps/Step6Review';
import SubmissionSuccessView from './SubmissionSuccessView';
import {
  validateStepByIndex,
  getStepValidity,
  getCompletedStepsCount,
} from '../utils/formValidation';
import catHeroImg from '../assets/cat-hero.jpg';

const STORAGE_KEY = 'project_form_draft_v3';
const STEP_STORAGE_KEY = 'project_form_step_v3';

const INITIAL_FORM_STATE = {
  // Step 1: Project Details
  projectName: '',
  client: '',
  startDate: '',
  endDate: '',
  notes: '',

  // Step 2: Billing & Type
  projectType: '',
  hourlyRate: '',
  budget: '',

  // Step 3: Tasks Scope
  tasks: [],

  // Step 4: Team Allocation
  team: [],

  // Step 5: Client Contact
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  preferredChannel: 'Slack',

  // Step 6: Confirmation
  isConfirmed: false,
};

const loadSavedFormData = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return INITIAL_FORM_STATE;

    const parsed = JSON.parse(saved);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return {
        ...INITIAL_FORM_STATE,
        ...parsed,
        tasks: Array.isArray(parsed.tasks) ? parsed.tasks : INITIAL_FORM_STATE.tasks,
        team: Array.isArray(parsed.team) ? parsed.team : INITIAL_FORM_STATE.team,
      };
    }
  } catch {
    // Fallback on corrupt JSON
  }
  return INITIAL_FORM_STATE;
};

const loadSavedStep = () => {
  try {
    const savedStep = localStorage.getItem(STEP_STORAGE_KEY);
    if (savedStep) {
      const parsedStep = Number(savedStep);
      if (parsedStep >= 1 && parsedStep <= STEPS_CONFIG.length) {
        return parsedStep;
      }
    }
  } catch {
    // Fallback
  }
  return 1;
};

export default function MultiStepForm() {
  const [formData, setFormData] = useState(loadSavedFormData);
  const [currentStep, setCurrentStep] = useState(loadSavedStep);
  const [touched, setTouched] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState(null);

  // Derive step validity map and completed steps count
  const stepValidity = useMemo(() => getStepValidity(formData), [formData]);
  const completedCount = useMemo(() => getCompletedStepsCount(stepValidity), [stepValidity]);

  // Derive current step validation errors
  const currentStepErrors = useMemo(() => {
    return validateStepByIndex(currentStep, formData, completedCount);
  }, [currentStep, formData, completedCount]);

  const isCurrentStepValid = Object.keys(currentStepErrors).length === 0;

  // Auto-save form data on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      localStorage.setItem(STEP_STORAGE_KEY, currentStep.toString());
      setLastSavedTime(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    } catch {
      // LocalStorage quota or privacy mode
    }
  }, [formData, currentStep]);

  // Generic input change handler
  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  // Generic onBlur field validation handler
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    if (name) {
      setTouched((prev) => ({ ...prev, [name]: true }));
    }
  }, []);

  // Step navigation: Jump to specific step
  const handleJumpToStep = (stepId) => {
    if (stepId >= 1 && stepId <= STEPS_CONFIG.length) {
      setCurrentStep(stepId);
    }
  };

  // Step navigation: Skip optional step (moves forward, step remains uncounted)
  const handleSkip = () => {
    if (currentStep < STEPS_CONFIG.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // Step navigation: Next step
  const handleNext = () => {
    if (isCurrentStepValid) {
      if (currentStep < STEPS_CONFIG.length) {
        setCurrentStep((prev) => prev + 1);
      }
    } else {
      // Mark all fields of current step as touched to surface errors
      const stepFields = {
        1: ['projectName', 'client', 'startDate', 'endDate', 'notes'],
        2: ['projectType', 'hourlyRate', 'budget'],
        3: ['tasks'],
        4: ['team'],
        5: ['contactName', 'contactEmail', 'contactPhone', 'preferredChannel'],
        6: ['confirmation'],
      }[currentStep] || [];

      setTouched((prev) => {
        const nextTouched = { ...prev };
        stepFields.forEach((f) => {
          nextTouched[f] = true;
        });
        return nextTouched;
      });
    }
  };

  // Step navigation: Previous step
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Clear draft reset handler
  const handleClearDraft = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STEP_STORAGE_KEY);
    } catch {
      // Ignore
    }
    setFormData(INITIAL_FORM_STATE);
    setTouched({});
    setCurrentStep(1);
    setIsSubmitted(false);
  };

  // Final submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!stepValidity[1]) {
      setTouched((prev) => ({ ...prev, confirmation: true }));
      return;
    }

    if (completedCount < 4) {
      setTouched((prev) => ({ ...prev, confirmation: true }));
      return;
    }

    if (!formData.isConfirmed) {
      setTouched((prev) => ({ ...prev, confirmation: true }));
      return;
    }

    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STEP_STORAGE_KEY);
    } catch {
      // Ignore
    }

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <SubmissionSuccessView
        formData={formData}
        completedCount={completedCount}
        onStartNew={handleClearDraft}
        onEditForm={() => setIsSubmitted(false)}
      />
    );
  }

  return (
    <div className="min-h-screen w-full bg-white text-slate-800 antialiased flex flex-col lg:flex-row items-stretch justify-between">
      
      {/* Left Column: Multi-Step Form Container */}
      <div className="w-full lg:w-7/12 xl:w-3/5 p-4 sm:p-6 lg:p-8 xl:p-12 flex items-center justify-center lg:justify-end">
        <div className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 sm:p-8 lg:p-9 transition-all duration-300">
          
          {/* Reusable Stepper Component */}
          <div className="mb-6 sm:mb-8 border-b border-slate-100 pb-5">
            <div className="flex items-center justify-end mb-2">
              {lastSavedTime && (
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Auto-saved at {lastSavedTime}</span>
                </div>
              )}
            </div>

            <Stepper
              currentStep={currentStep}
              stepValidity={stepValidity}
              completedCount={completedCount}
              onSelectStep={handleJumpToStep}
            />
          </div>

          {/* Form Step Body */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Step 1: Project Info */}
            {currentStep === 1 && (
              <Step1ProjectDetails
                formData={formData}
                errors={currentStepErrors}
                touched={touched}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
            )}

            {/* Step 2: Project Type & Billing */}
            {currentStep === 2 && (
              <Step2ProjectType
                formData={formData}
                errors={currentStepErrors}
                touched={touched}
                onChange={handleInputChange}
                onBlur={handleBlur}
                setFormData={setFormData}
              />
            )}

            {/* Step 3: Tasks Scope */}
            {currentStep === 3 && (
              <Step3Tasks
                formData={formData}
                setFormData={setFormData}
                errors={currentStepErrors}
                touched={touched}
              />
            )}

            {/* Step 4: Team Allocation */}
            {currentStep === 4 && (
              <Step4Team
                formData={formData}
                setFormData={setFormData}
                errors={currentStepErrors}
                touched={touched}
              />
            )}

            {/* Step 5: Client Contact */}
            {currentStep === 5 && (
              <Step5ClientContact
                formData={formData}
                errors={currentStepErrors}
                touched={touched}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
            )}

            {/* Step 6: Review & Confirmation */}
            {currentStep === 6 && (
              <Step6Review
                formData={formData}
                stepValidity={stepValidity}
                completedCount={completedCount}
                errors={currentStepErrors}
                touched={touched}
                onChange={handleInputChange}
                onJumpToStep={handleJumpToStep}
              />
            )}

            {/* Bottom Navigation Bar */}
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-3">
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

              <div className="flex items-center gap-2.5 ml-auto">
                {/* Skip Step Button (Available only for optional intermediate steps 2-5) */}
                {currentStep > 1 && currentStep < STEPS_CONFIG.length && (
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="h-11 px-4 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  >
                    Skip Step
                  </button>
                )}

                {/* Next Step or Submit Button */}
                {currentStep < STEPS_CONFIG.length ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!isCurrentStepValid}
                    className={`h-11 px-6 text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 ${
                      !isCurrentStepValid
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
                    disabled={completedCount < 4 || !formData.isConfirmed}
                    className={`h-11 px-7 text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 ${
                      completedCount < 4 || !formData.isConfirmed
                        ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed shadow-none'
                        : 'bg-black hover:bg-slate-800 active:bg-slate-900 text-white cursor-pointer shadow-md hover:shadow-black/20'
                    }`}
                  >
                    <span>Submit Project</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

          </form>
        </div>
      </div>

      {/* Right Column: Cat Hero Illustration */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-2/5 relative items-center justify-center bg-white p-6 xl:p-10 select-none overflow-hidden">
        <div className="relative max-w-md w-full flex flex-col items-center justify-center">
          <img
            src={catHeroImg}
            alt="Curious Cat Peeking"
            className="w-full max-h-[80vh] object-contain select-none pointer-events-none transition-transform duration-500 hover:scale-105"
          />
          
          {/* Decorative Floating Status Card */}
          <div className="absolute bottom-6 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-lg shadow-slate-200/50 px-5 py-3 rounded-2xl flex items-center gap-3.5 animate-fade-in">
            <div className={`w-3 h-3 rounded-full ${completedCount >= 4 ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <div>
              <p className="text-xs font-bold text-slate-800 tracking-tight">
                {completedCount >= 4 ? '4+ Steps Valid 🐾' : 'Configuration in Progress 🐾'}
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                {completedCount} of 6 steps completed
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
