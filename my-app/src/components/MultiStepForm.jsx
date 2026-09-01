import React, { useState, useEffect } from 'react';
import ProjectDetailsStep from './ProjectDetailsStep';
import ProjectTypeStep from './ProjectTypeStep';
import TasksStep from './TasksStep';
import TeamStep from './TeamStep';

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
  } catch (error) {
    console.warn('Error reading form data from localStorage:', error);
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
  } catch (error) {
    console.warn('Error reading step from localStorage:', error);
  }
  return 1;
};

export default function MultiStepForm() {
  const [formData, setFormData] = useState(loadSavedFormData);
  const [currentStep, setCurrentStep] = useState(loadSavedStep);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (error) {
      console.warn('Error saving form data to localStorage:', error);
    }
  }, [formData]);

  useEffect(() => {
    try {
      localStorage.setItem(STEP_STORAGE_KEY, String(currentStep));
    } catch (error) {
      console.warn('Error saving step to localStorage:', error);
    }
  }, [currentStep]);

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
    if (!isValid) return;

    if (currentStep < STEPS.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setErrors({});
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleJumpToStep = (stepNumber) => {
    setErrors({});
    setCurrentStep(stepNumber);
  };

  const handleClearDraft = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STEP_STORAGE_KEY);
    } catch (error) {
      console.warn('Error clearing localStorage:', error);
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
    } catch (error) {
      console.warn('Error removing draft on submit:', error);
    }

    setIsSubmitted(true);
  };

  const progressPercentage = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-3 sm:p-6 lg:p-8 text-slate-100 antialiased">
      <div className="w-full max-w-2xl bg-slate-800/85 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/60 p-5 sm:p-8 lg:p-10 transition-all duration-300">
        
        {/* Top Header: Step Badge & Auto-save status */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                Step {currentStep} of {STEPS.length}
              </span>
            </div>

            {lastSavedTime && (
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-full flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="hidden sm:inline">Auto-saved at</span> {lastSavedTime}
              </div>
            )}
          </div>

          {/* Simple Step Progress UI */}
          <div className="relative pt-2 pb-6">
            {/* Background Line */}
            <div className="absolute left-0 top-6 -translate-y-1/2 h-1 w-full bg-slate-700/70 z-0 rounded-full" />
            
            {/* Active Progress Fill */}
            <div
              className="absolute left-0 top-6 -translate-y-1/2 h-1 bg-gradient-to-r from-indigo-500 to-violet-500 z-0 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />

            {/* Stepper Dots & Labels */}
            <div className="relative z-10 flex items-center justify-between">
              {STEPS.map((step) => {
                const isCompleted = step.id < currentStep;
                const isCurrent = step.id === currentStep;

                return (
                  <div key={step.id} className="flex flex-col items-center">
                    <button
                      type="button"
                      disabled={step.id > currentStep}
                      onClick={() => handleJumpToStep(step.id)}
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-200 shadow-md ${
                        isCompleted
                          ? 'bg-indigo-600 hover:bg-indigo-500 text-white ring-4 ring-indigo-950 cursor-pointer'
                          : isCurrent
                          ? 'bg-indigo-500 text-white ring-4 ring-indigo-400/30 scale-110 shadow-indigo-500/25'
                          : 'bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed'
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
                    <span className="hidden sm:block text-[11px] font-medium text-slate-400 mt-2 absolute -bottom-1 whitespace-nowrap">
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
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold text-white mb-2 tracking-tight">Project Created!</h2>
            <p className="text-slate-300 text-sm mb-6 max-w-sm mx-auto">
              Project <span className="font-semibold text-indigo-300">"{formData.projectName}"</span> has been configured and submitted.
            </p>
            <button
              onClick={handleClearDraft}
              className="h-11 px-6 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-all shadow-lg hover:shadow-indigo-500/25 cursor-pointer"
            >
              Start New Project
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
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
                <div className="border-t border-slate-700/80 pt-6">
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
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-white tracking-tight">Review & Confirmation</h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Please review your project details before final submission.
                  </p>
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm">
                  {/* Summary Box 1: Info */}
                  <div className="bg-slate-900/60 border border-slate-700/60 rounded-2xl p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-indigo-400 uppercase tracking-wider text-xs">
                        1. Project Info
                      </span>
                      <button
                        type="button"
                        onClick={() => handleJumpToStep(1)}
                        className="text-xs text-indigo-400 hover:text-indigo-300 font-medium underline cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="space-y-1.5 text-slate-300">
                      <p><strong className="text-slate-400">Name:</strong> {formData.projectName}</p>
                      <p><strong className="text-slate-400">Client:</strong> {formData.client}</p>
                      <p><strong className="text-slate-400">Timeline:</strong> {formData.startDate} to {formData.endDate}</p>
                      {formData.notes && <p><strong className="text-slate-400">Notes:</strong> {formData.notes}</p>}
                    </div>
                  </div>

                  {/* Summary Box 2: Type */}
                  <div className="bg-slate-900/60 border border-slate-700/60 rounded-2xl p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-indigo-400 uppercase tracking-wider text-xs">
                        2. Billing & Type
                      </span>
                      <button
                        type="button"
                        onClick={() => handleJumpToStep(2)}
                        className="text-xs text-indigo-400 hover:text-indigo-300 font-medium underline cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="space-y-1.5 text-slate-300">
                      <p><strong className="text-slate-400">Type:</strong> {formData.projectType}</p>
                      {formData.projectType === 'Time & Materials' && (
                        <p><strong className="text-slate-400">Rate:</strong> ${formData.hourlyRate}/hr</p>
                      )}
                      {formData.projectType === 'Fixed Fee' && (
                        <p><strong className="text-slate-400">Budget:</strong> ${Number(formData.budget).toLocaleString()}</p>
                      )}
                    </div>
                  </div>

                  {/* Summary Box 3: Tasks & Team */}
                  <div className="bg-slate-900/60 border border-slate-700/60 rounded-2xl p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-indigo-400 uppercase tracking-wider text-xs">
                        3. Tasks & Team
                      </span>
                      <button
                        type="button"
                        onClick={() => handleJumpToStep(3)}
                        className="text-xs text-indigo-400 hover:text-indigo-300 font-medium underline cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="space-y-1.5 text-slate-300">
                      <p><strong className="text-slate-400">Tasks ({formData.tasks.length}):</strong> {formData.tasks.join(', ') || 'None'}</p>
                      <p><strong className="text-slate-400">Team ({formData.team.length}):</strong> {formData.team.map((m) => m.name).join(', ') || 'None'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation & Action Bar */}
            <div className="pt-6 border-t border-slate-700/70 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className={`h-11 px-5 text-sm font-semibold rounded-xl transition-all ${
                    currentStep === 1
                      ? 'opacity-0 pointer-events-none'
                      : 'bg-slate-700 hover:bg-slate-600 text-slate-200 cursor-pointer shadow-sm'
                  }`}
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleClearDraft}
                  className="text-xs text-slate-500 hover:text-red-400 transition-colors px-2.5 py-2 cursor-pointer font-medium"
                >
                  Clear Draft
                </button>
              </div>

              {currentStep < STEPS.length ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="h-11 px-6 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-xl transition-all shadow-md hover:shadow-indigo-500/20 cursor-pointer ml-auto"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  className="h-11 px-6 text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-xl transition-all shadow-md hover:shadow-emerald-500/20 cursor-pointer ml-auto"
                >
                  Submit Project
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
