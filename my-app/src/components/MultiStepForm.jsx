import React, { useState, useEffect, useMemo } from 'react';
import ProjectDetailsStep from './ProjectDetailsStep';
import ProjectTypeStep from './ProjectTypeStep';
import TasksStep from './TasksStep';
import TeamStep from './TeamStep';
import SubmissionSuccessView from './SubmissionSuccessView';
import catHeroImg from '../assets/cat-hero.jpg';

const STORAGE_KEY = 'project_form_draft_data';
const STEP_STORAGE_KEY = 'project_form_draft_step';

const STEPS = [
  { id: 1, title: 'Project Info', shortTitle: 'Info', description: 'Name, client & timeline' },
  { id: 2, title: 'Project Type', shortTitle: 'Type', description: 'Billing & budget setup' },
  { id: 3, title: 'Tasks & Team', shortTitle: 'Tasks/Team', description: 'Deliverables & members' },
  { id: 4, title: 'Review & Submit', shortTitle: 'Review', description: 'Final verification' },
];

const INITIAL_FORM_STATE = {
  projectName: '',
  client: '',
  startDate: '',
  endDate: '',
  notes: '',
  projectType: 'Time & Materials',
  hourlyRate: '',
  budget: '',
  tasks: ['Setup repository & environment'],
  team: [
    { id: 'u1', name: 'Ram', role: 'Frontend Engineer', email: 'ram@example.com', initials: 'RM' }
  ],
};

const checkStepValidity = (step, data) => {
  if (step === 1) {
    if (!data.projectName || !data.projectName.trim()) return false;
    if (!data.client || !data.client.trim()) return false;
    if (!data.startDate || !data.endDate) return false;
    if (new Date(data.startDate) >= new Date(data.endDate)) return false;
    return true;
  }

  if (step === 2) {
    if (data.projectType === 'Time & Materials') {
      return Boolean(data.hourlyRate && Number(data.hourlyRate) > 0);
    }
    if (data.projectType === 'Fixed Fee') {
      return Boolean(data.budget && Number(data.budget) > 0);
    }
    if (data.projectType === 'Non-billable') {
      return true;
    }
    return false;
  }

  if (step === 3) {
    return Array.isArray(data.tasks) && data.tasks.length > 0 && Array.isArray(data.team) && data.team.length > 0;
  }

  if (step === 4) {
    return checkStepValidity(1, data) && checkStepValidity(2, data) && checkStepValidity(3, data);
  }

  return true;
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
    // Fallback
  }
  return INITIAL_FORM_STATE;
};

const loadSavedStep = () => {
  try {
    const savedStep = localStorage.getItem(STEP_STORAGE_KEY);
    if (savedStep) {
      const parsedStep = Number(savedStep);
      if (parsedStep >= 1 && parsedStep <= STEPS.length) {
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
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isStepTransitioning, setIsStepTransitioning] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch {
      // Ignore storage errors
    }
  }, [formData]);

  useEffect(() => {
    try {
      localStorage.setItem(STEP_STORAGE_KEY, String(currentStep));
    } catch {
      // Ignore storage errors
    }
  }, [currentStep]);

  const isCurrentStepValid = useMemo(() => {
    return checkStepValidity(currentStep, formData);
  }, [currentStep, formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.projectName.trim()) newErrors.projectName = 'Project name is required.';
      if (!formData.client.trim()) newErrors.client = 'Please select a client.';
      if (!formData.startDate) newErrors.startDate = 'Start date is required.';
      if (!formData.endDate) {
        newErrors.endDate = 'End date is required.';
      } else if (formData.startDate && new Date(formData.startDate) >= new Date(formData.endDate)) {
        newErrors.endDate = 'Start date must be before end date.';
      }
    }

    if (step === 2) {
      if (formData.projectType === 'Time & Materials' && (!formData.hourlyRate || Number(formData.hourlyRate) <= 0)) {
        newErrors.hourlyRate = 'Please enter a valid hourly rate.';
      }
      if (formData.projectType === 'Fixed Fee' && (!formData.budget || Number(formData.budget) <= 0)) {
        newErrors.budget = 'Please enter a valid total budget.';
      }
    }

    if (step === 3) {
      if (formData.tasks.length === 0) newErrors.tasks = 'Please add at least one task.';
      if (formData.team.length === 0) newErrors.team = 'Please assign at least one team member.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    const isValid = validateStep(currentStep);
    if (!isValid || isStepTransitioning) return;

    if (currentStep < STEPS.length) {
      setIsStepTransitioning(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        setIsStepTransitioning(false);
      }, 150);
    }
  };

  const handleBack = () => {
    if (currentStep > 1 && !isStepTransitioning) {
      setErrors({});
      setIsStepTransitioning(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev - 1);
        setIsStepTransitioning(false);
      }, 150);
    }
  };

  const handleJumpToStep = (stepNumber) => {
    if (stepNumber === currentStep || isStepTransitioning) return;
    
    let canJump = true;
    for (let i = 1; i < stepNumber; i++) {
      if (!checkStepValidity(i, formData)) {
        canJump = false;
        break;
      }
    }

    if (canJump || stepNumber < currentStep) {
      setErrors({});
      setIsStepTransitioning(true);
      setTimeout(() => {
        setCurrentStep(stepNumber);
        setIsStepTransitioning(false);
      }, 150);
    }
  };

  const handleClearDraft = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STEP_STORAGE_KEY);
    } catch {
      // Ignore
    }
    setFormData(INITIAL_FORM_STATE);
    setCurrentStep(1);
    setErrors({});
    setIsSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) return;

    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STEP_STORAGE_KEY);
    } catch {
      // Ignore
    }

    setIsSubmitted(true);
  };

  const progressPercentage = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  if (isSubmitted) {
    return (
      <SubmissionSuccessView
        formData={formData}
        onStartNew={handleClearDraft}
        onEditForm={() => setIsSubmitted(false)}
      />
    );
  }

  return (
    <div className="min-h-screen w-full bg-white text-slate-800 antialiased flex flex-col lg:flex-row items-stretch justify-between relative">
      
      {/* Left Column: Form Container */}
      <div className="w-full lg:w-7/12 xl:w-3/5 p-4 sm:p-6 lg:p-8 xl:p-12 flex items-center justify-center lg:justify-end">
        <div className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 sm:p-8 lg:p-9 transition-all duration-300">
          
            {/* Top Header: Step Badge & Auto-save status */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2">
                <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200">
                  Step {currentStep} of {STEPS.length}
                </span>
              </div>

              {lastSavedTime && (
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex-shrink-0 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="hidden sm:inline">Auto-saved at</span> {lastSavedTime}
                </div>
              )}
            </div>

            {/* Step Progress UI */}
            <div className="relative pt-1 pb-2">
              {/* Background Track Line */}
              <div className="absolute left-4 right-4 top-[18px] -translate-y-1/2 h-1 bg-slate-100 z-0 rounded-full" />
              
              {/* Active Progress Fill */}
              <div
                className="absolute left-4 top-[18px] -translate-y-1/2 h-1 bg-black z-0 rounded-full transition-all duration-300 ease-out"
                style={{ width: `calc(${progressPercentage}% * 0.9)` }}
              />

              {/* Stepper Dots & Labels */}
              <div className="relative z-10 flex items-start justify-between">
                {STEPS.map((step) => {
                  const isCompleted = step.id < currentStep;
                  const isCurrent = step.id === currentStep;
                  const isValidated = checkStepValidity(step.id, formData);

                  return (
                    <div key={step.id} className="flex flex-col items-center">
                      <button
                        type="button"
                        disabled={step.id > currentStep && !isValidated}
                        onClick={() => handleJumpToStep(step.id)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-200 ${
                          isCompleted
                            ? 'bg-black hover:bg-slate-800 text-white ring-4 ring-slate-100 cursor-pointer shadow-xs'
                            : isCurrent
                            ? 'bg-black text-white ring-4 ring-slate-200 scale-110 shadow-md shadow-black/20'
                            : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                        }`}
                      >
                        {isCompleted ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          step.id
                        )}
                      </button>

                      <span className={`text-[11px] sm:text-xs font-medium mt-2.5 text-center whitespace-nowrap transition-colors ${
                        isCurrent ? 'text-black font-bold' : isCompleted ? 'text-slate-800 font-semibold' : 'text-slate-400'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Form Body / Content View */}
          {isSubmitted ? (
            <div className="text-center py-10 animate-fade-in">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-md shadow-emerald-500/10">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-2 tracking-tight">Project Successfully Created!</h2>
              <p className="text-slate-600 text-sm mb-7 max-w-sm mx-auto leading-relaxed">
                Project <span className="font-semibold text-slate-900">"{formData.projectName}"</span> has been configured and submitted.
              </p>
              <button
                onClick={handleClearDraft}
                className="h-11 px-7 bg-black hover:bg-slate-800 active:bg-slate-900 text-white font-semibold rounded-xl text-sm transition-all shadow-md hover:shadow-black/25 cursor-pointer"
              >
                Start New Project
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Step Body with Animation */}
              <div className={`transition-opacity duration-200 ${isStepTransitioning ? 'opacity-40' : 'opacity-100 animate-fade-in'}`}>
                {/* Step 1: Project Info */}
                {currentStep === 1 && (
                  <ProjectDetailsStep
                    formData={formData}
                    errors={errors}
                    onChange={handleInputChange}
                  />
                )}

                {/* Step 2: Project Type & Billing */}
                {currentStep === 2 && (
                  <ProjectTypeStep
                    formData={formData}
                    errors={errors}
                    onChange={handleInputChange}
                  />
                )}

                {/* Step 3: Tasks & Team */}
                {currentStep === 3 && (
                  <div className="space-y-8">
                    <TasksStep
                      formData={formData}
                      setFormData={setFormData}
                      errors={errors}
                    />
                    <div className="border-t border-slate-100 pt-6">
                      <TeamStep
                        formData={formData}
                        setFormData={setFormData}
                        errors={errors}
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Review & Confirmation */}
                {currentStep === 4 && (
                  <div className="space-y-5">
                    <div className="border-b border-slate-100 pb-4">
                      <h3 className="text-xl font-bold text-slate-900 tracking-tight">Review & Confirmation</h3>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Please review your project details before final submission.
                      </p>
                    </div>

                    <div className="space-y-3.5 text-xs sm:text-sm">
                      {/* Summary Box 1: Info */}
                      <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-4 sm:p-5">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-bold text-black uppercase tracking-wider text-xs">
                            1. Project Info
                          </span>
                          <button
                            type="button"
                            onClick={() => handleJumpToStep(1)}
                            className="text-xs text-black hover:text-slate-600 font-semibold underline cursor-pointer"
                          >
                            Edit
                          </button>
                        </div>
                        <div className="space-y-1.5 text-slate-700">
                          <p><strong className="text-slate-500">Name:</strong> {formData.projectName}</p>
                          <p><strong className="text-slate-500">Client:</strong> {formData.client}</p>
                          <p><strong className="text-slate-500">Timeline:</strong> {formData.startDate} to {formData.endDate}</p>
                          {formData.notes && <p><strong className="text-slate-500">Notes:</strong> {formData.notes}</p>}
                        </div>
                      </div>

                      {/* Summary Box 2: Type */}
                      <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-4 sm:p-5">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-bold text-black uppercase tracking-wider text-xs">
                            2. Billing & Type
                          </span>
                          <button
                            type="button"
                            onClick={() => handleJumpToStep(2)}
                            className="text-xs text-black hover:text-slate-600 font-semibold underline cursor-pointer"
                          >
                            Edit
                          </button>
                        </div>
                        <div className="space-y-1.5 text-slate-700">
                          <p><strong className="text-slate-500">Type:</strong> {formData.projectType}</p>
                          {formData.projectType === 'Time & Materials' && (
                            <p><strong className="text-slate-500">Rate:</strong> ${formData.hourlyRate}/hr</p>
                          )}
                          {formData.projectType === 'Fixed Fee' && (
                            <p><strong className="text-slate-500">Budget:</strong> ${Number(formData.budget).toLocaleString()}</p>
                          )}
                        </div>
                      </div>

                      {/* Summary Box 3: Tasks & Team */}
                      <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-4 sm:p-5">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-bold text-black uppercase tracking-wider text-xs">
                            3. Tasks & Team
                          </span>
                          <button
                            type="button"
                            onClick={() => handleJumpToStep(3)}
                            className="text-xs text-black hover:text-slate-600 font-semibold underline cursor-pointer"
                          >
                            Edit
                          </button>
                        </div>
                        <div className="space-y-1.5 text-slate-700">
                          <p><strong className="text-slate-500">Tasks ({formData.tasks.length}):</strong> {formData.tasks.join(', ') || 'None'}</p>
                          <p><strong className="text-slate-500">Team ({formData.team.length}):</strong> {formData.team.map((m) => m.name).join(', ') || 'None'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation & Action Bar */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={currentStep === 1 || isStepTransitioning}
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

                {currentStep < STEPS.length ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!isCurrentStepValid || isStepTransitioning}
                    className={`h-11 px-6 text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 ml-auto ${
                      !isCurrentStepValid || isStepTransitioning
                        ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed shadow-none'
                        : 'bg-black hover:bg-slate-800 active:bg-slate-900 text-white cursor-pointer shadow-md hover:shadow-black/20'
                    }`}
                  >
                    {isStepTransitioning ? (
                      <>
                        <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        <span>Loading...</span>
                      </>
                    ) : (
                      <>
                        <span>Next Step</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!isCurrentStepValid}
                    className={`h-11 px-7 text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 ml-auto ${
                      !isCurrentStepValid
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
            </form>
          )}
        </div>
      </div>

      {/* Right Column: Cat Hero Image (Seamlessly merges with white background) */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-2/5 relative items-center justify-center bg-white p-6 xl:p-10 select-none overflow-hidden">
        <div className="relative max-w-md w-full flex flex-col items-center justify-center">
          <img
            src={catHeroImg}
            alt="Curious Cat Peeking"
            className="w-full max-h-[80vh] object-contain select-none pointer-events-none transition-transform duration-500 hover:scale-105"
          />
          
          {/* Subtle Decorative Floating Card */}
          <div className="absolute bottom-6 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-lg shadow-slate-200/50 px-5 py-3 rounded-2xl flex items-center gap-3.5 animate-fade-in">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-800 tracking-tight">Supervising with Care 🐾</p>
              <p className="text-[11px] text-slate-500 font-medium">Keep track of your project & team</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
