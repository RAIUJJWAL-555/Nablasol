import React from 'react';

export const TASK2_STEPS = [
  { id: 1, title: 'Step 1: Profile', shortTitle: 'Profile', desc: 'Personal & Credentials' },
  { id: 2, title: 'Step 2: Business Info', shortTitle: 'Business Info', desc: 'Company & Tax Details' },
];

/**
 * 2-Step Progress Stepper for Task 2
 */
function Task2Stepper({ currentStep, isStep1Valid, onSelectStep }) {
  return (
    <div className="w-full select-none mb-6">
      {/* Top Header Badge */}
      <div className="flex items-center justify-between gap-2 mb-3.5">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200">
          Step {currentStep} of {TASK2_STEPS.length}
        </span>
        <span className="text-xs font-semibold text-slate-500">
          {TASK2_STEPS[currentStep - 1]?.title}
        </span>
      </div>

      {/* Stepper Track */}
      <div className="relative pt-1 pb-2">
        <div className="absolute left-8 right-8 top-[18px] -translate-y-1/2 h-1 bg-slate-100 z-0 rounded-full" />
        <div
          className="absolute left-8 top-[18px] -translate-y-1/2 h-1 bg-black z-0 rounded-full transition-all duration-300 ease-out"
          style={{ width: currentStep === 2 ? 'calc(100% - 64px)' : '0%' }}
        />

        {/* 2 Step Nodes */}
        <div className="relative z-10 flex items-center justify-between px-2">
          {TASK2_STEPS.map((step) => {
            const isCompleted = step.id === 1 && currentStep === 2 && isStep1Valid;
            const isCurrent = step.id === currentStep;
            const isAccessible = step.id === 1 || isStep1Valid;

            return (
              <div key={step.id} className="flex flex-col items-center">
                <button
                  type="button"
                  disabled={!isAccessible}
                  onClick={() => isAccessible && onSelectStep(step.id)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-200 ${
                    isCompleted
                      ? 'bg-black hover:bg-slate-800 text-white ring-4 ring-slate-100 shadow-xs cursor-pointer'
                      : isCurrent
                      ? 'bg-black text-white ring-4 ring-slate-200 scale-110 shadow-md shadow-black/20'
                      : isAccessible
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 cursor-pointer'
                      : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                  }`}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.id
                  )}
                </button>

                <div className="text-center mt-2">
                  <p className={`text-xs font-semibold ${isCurrent ? 'text-black font-bold' : isCompleted ? 'text-slate-800' : 'text-slate-400'}`}>
                    {step.title}
                  </p>
                  <p className="text-[11px] text-slate-400 hidden sm:block">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Task2Stepper);
