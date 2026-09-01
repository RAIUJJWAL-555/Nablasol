import React from 'react';

const PROJECT_TYPES = [
  {
    id: 'Time & Materials',
    title: 'Time & Materials',
    description: 'Billed based on actual logged hours and expenses.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'Fixed Fee',
    title: 'Fixed Fee',
    description: 'Agreed total contract price for milestones.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    id: 'Non-billable',
    title: 'Non-billable',
    description: 'Internal project, research, or pro-bono.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export default function ProjectTypeStep({ formData, errors = {}, onChange }) {
  const handleSelectType = (typeId) => {
    onChange({
      target: {
        name: 'projectType',
        value: typeId,
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Title & Description */}
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">Project Type & Billing</h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Select your billing structure and configure financial parameters.
        </p>
      </div>

      {/* Selectable Option Cards (Responsive 1 col mobile, 3 cols desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {PROJECT_TYPES.map((type) => {
          const isSelected = formData.projectType === type.id;

          return (
            <div
              key={type.id}
              onClick={() => handleSelectType(type.id)}
              className={`relative cursor-pointer rounded-2xl p-4 sm:p-5 border transition-all duration-200 flex flex-col justify-between select-none ${
                isSelected
                  ? 'bg-slate-50/90 border-black ring-2 ring-black/10 shadow-md shadow-black/5'
                  : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-slate-100/60 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`p-2.5 rounded-xl transition-colors ${
                    isSelected ? 'bg-black text-white' : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  {type.icon}
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? 'border-black bg-black'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </div>

              <div>
                <h4 className={`text-sm font-semibold mb-1 ${isSelected ? 'text-black font-bold' : 'text-slate-800'}`}>
                  {type.title}
                </h4>
                <p className={`text-xs leading-relaxed ${isSelected ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>
                  {type.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Conditional: Time & Materials -> Hourly Rate */}
      {formData.projectType === 'Time & Materials' && (
        <div className="pt-2 animate-fade-in">
          <label htmlFor="hourlyRate" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            Hourly Rate ($/hr) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 text-sm font-medium">
              $
            </div>
            <input
              id="hourlyRate"
              type="number"
              name="hourlyRate"
              min="0"
              step="0.01"
              value={formData.hourlyRate || ''}
              onChange={onChange}
              placeholder="85.00"
              className={`w-full h-11 pl-9 pr-20 bg-slate-50/80 border rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.hourlyRate
                  ? 'border-red-400 focus:ring-red-500/20 bg-red-50/30'
                  : 'border-slate-200 hover:border-slate-300 focus:border-black focus:ring-black/10'
              }`}
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 text-xs font-medium">
              USD / hr
            </div>
          </div>
          {errors.hourlyRate && (
            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{errors.hourlyRate}</span>
            </p>
          )}
        </div>
      )}

      {/* Conditional: Fixed Fee -> Total Budget */}
      {formData.projectType === 'Fixed Fee' && (
        <div className="pt-2 animate-fade-in">
          <label htmlFor="budget" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            Total Project Budget ($) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 text-sm font-medium">
              $
            </div>
            <input
              id="budget"
              type="number"
              name="budget"
              min="0"
              step="1"
              value={formData.budget || ''}
              onChange={onChange}
              placeholder="15,000"
              className={`w-full h-11 pl-9 pr-16 bg-slate-50/80 border rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.budget
                  ? 'border-red-400 focus:ring-red-500/20 bg-red-50/30'
                  : 'border-slate-200 hover:border-slate-300 focus:border-black focus:ring-black/10'
              }`}
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 text-xs font-medium">
              USD
            </div>
          </div>
          {errors.budget && (
            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{errors.budget}</span>
            </p>
          )}
        </div>
      )}

      {/* Non-billable Information Banner */}
      {formData.projectType === 'Non-billable' && (
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3.5 text-xs text-slate-600">
          <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 mt-0.5 flex-shrink-0 shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <span className="font-semibold text-slate-900 text-sm">Non-billable Project</span>
            <p className="text-slate-500 mt-0.5 text-xs">
              No hourly rate or budget tracking will be applied for invoicing purposes.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
