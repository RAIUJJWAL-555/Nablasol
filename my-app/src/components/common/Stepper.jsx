import React from 'react';

export const STEPS_CONFIG = [
  { id: 1, title: 'Project Info', shortTitle: 'Info', desc: 'Basic info & client' },
  { id: 2, title: 'Type & Billing', shortTitle: 'Billing', desc: 'Rates & budget' },
  { id: 3, title: 'Tasks Scope', shortTitle: 'Tasks', desc: 'Scope & deliverables' },
  { id: 4, title: 'Team Allocation', shortTitle: 'Team', desc: 'Specialists & roles' },
  { id: 5, title: 'Client Contact', shortTitle: 'Contact', desc: 'Stakeholder info' },
  { id: 6, title: 'Review & Submit', shortTitle: 'Review', desc: 'Final confirmation' },
];

/**
 * 6-Step Stepper Component:
 * - Step valid -> Counted (Checkmark icon)
 * - Step skipped/incomplete -> Not counted (Step number)
 * - Free navigation between any steps to allow completing ANY 4 of 6 steps
 */
export default function Stepper({
  currentStep,
  stepValidity = {},
  onSelectStep,
  completedCount = 0,
}) {
  const progressPercentage = ((currentStep - 1) / (STEPS_CONFIG.length - 1)) * 100;

  return (
    <div className="w-full select-none">
      {/* Top Header: Completion Counter & Status Badge */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200">
            Step {currentStep} of {STEPS_CONFIG.length}
          </span>
          <span className="text-xs font-semibold text-slate-600 hidden sm:inline">
            • {STEPS_CONFIG[currentStep - 1]?.title}
          </span>
        </div>

        {/* Dynamic Progress Badge */}
        <div
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border transition-all ${
            completedCount >= 4
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-slate-100 text-slate-700 border-slate-200'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              completedCount >= 4 ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
            }`}
          />
          <span>
            {completedCount} of 6 valid{' '}
            <span className="text-[10px] opacity-75 font-normal">
              ({completedCount >= 4 ? 'Ready to submit' : 'min 4 required'})
            </span>
          </span>
        </div>
      </div>

      {/* Stepper Track & Nodes */}
      <div className="relative pt-2 pb-3">
        {/* Background Track Line */}
        <div className="absolute left-4 right-4 top-[22px] -translate-y-1/2 h-1 bg-slate-100 z-0 rounded-full" />

        {/* Active Progress Fill */}
        <div
          className="absolute left-4 top-[22px] -translate-y-1/2 h-1 bg-black z-0 rounded-full transition-all duration-300 ease-out"
          style={{ width: `calc(${progressPercentage}% * 0.9)` }}
        />

        {/* 6 Step Nodes */}
        <div className="relative z-10 flex items-start justify-between">
          {STEPS_CONFIG.map((step) => {
            const isValid = Boolean(stepValidity[step.id]);
            const isCurrent = step.id === currentStep;

            return (
              <div key={step.id} className="flex flex-col items-center group">
                <button
                  type="button"
                  onClick={() => onSelectStep(step.id)}
                  title={`${step.title} (${isValid ? 'Valid & Counted' : 'Skipped / Incomplete'})`}
                  aria-label={`Step ${step.id}: ${step.title}. ${
                    isValid ? 'Valid' : isCurrent ? 'Active' : 'Incomplete'
                  }`}
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-200 cursor-pointer ${
                    isValid
                      ? 'bg-black hover:bg-slate-800 text-white ring-4 ring-slate-100 shadow-xs'
                      : isCurrent
                      ? 'bg-black text-white ring-4 ring-slate-200 scale-110 shadow-md shadow-black/20'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-500 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {isValid ? (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.id
                  )}
                </button>

                {/* Step Label */}
                <span
                  className={`text-[10px] sm:text-xs font-medium mt-2 text-center transition-colors max-w-[55px] sm:max-w-none truncate ${
                    isCurrent
                      ? 'text-black font-bold'
                      : isValid
                      ? 'text-slate-800 font-semibold'
                      : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                >
                  <span className="hidden sm:inline">{step.title}</span>
                  <span className="inline sm:hidden">{step.shortTitle}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
