import React from 'react';
import Field from '../common/Field';
import ErrorMessage from '../common/ErrorMessage';

const PROJECT_TYPES = [
  {
    id: 'Time & Materials',
    title: 'Time & Materials',
    description: 'Billed dynamically based on hourly rates and actual tracked hours.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'Fixed Fee',
    title: 'Fixed Fee',
    description: 'Set a predetermined total project budget with clear deliverables.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    id: 'Non-billable',
    title: 'Non-billable',
    description: 'Internal initiatives, open source, or pro-bono activities.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

/**
 * Step 2: Project Type & Billing Rate / Budget
 */
function Step2ProjectType({
  formData,
  errors = {},
  touched = {},
  onChange,
  onBlur,
  onTypeSelect,
}) {
  const handleSelectType = (typeId) => {
    setFormData((prev) => ({
      ...prev,
      projectType: typeId,
      hourlyRate: typeId === 'Time & Materials' ? prev.hourlyRate : '',
      budget: typeId === 'Fixed Fee' ? prev.budget : '',
    }));
  };

  return (
    <div className="space-y-4 sm:space-y-5 animate-fade-in">
      {/* Step Header */}
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">Billing & Commercials</h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Choose the pricing model and financial parameters for this engagement.
        </p>
      </div>

      {/* Selectable Option Cards (Responsive 1 col mobile, 3 cols desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {PROJECT_TYPES.map((type) => {
          const isSelected = formData.projectType === type.id;

          return (
            <div
              key={type.id}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onClick={() => handleSelectType(type.id)}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  handleSelectType(type.id);
                }
              }}
              className={`relative cursor-pointer rounded-2xl p-4 border transition-all duration-200 flex flex-col justify-between select-none outline-none focus:ring-2 focus:ring-black/20 ${
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
                    isSelected ? 'border-black bg-black' : 'border-slate-300 bg-white'
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

      {touched.projectType && errors.projectType && (
        <ErrorMessage error={errors.projectType} />
      )}

      {/* Conditional 1: Time & Materials -> Hourly Rate */}
      {formData.projectType === 'Time & Materials' && (
        <div className="pt-2 animate-fade-in">
          <Field
            id="hourlyRate"
            name="hourlyRate"
            label="Hourly Rate"
            type="number"
            min="0"
            step="0.01"
            required
            prefix="$"
            suffix="USD / hr"
            value={formData.hourlyRate}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="85.00"
            error={touched.hourlyRate ? errors.hourlyRate : undefined}
          />
        </div>
      )}

      {/* Conditional 2: Fixed Fee -> Total Budget */}
      {formData.projectType === 'Fixed Fee' && (
        <div className="pt-2 animate-fade-in">
          <Field
            id="budget"
            name="budget"
            label="Total Project Budget"
            type="number"
            min="0"
            step="100"
            required
            prefix="$"
            suffix="USD"
            value={formData.budget}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="25000"
            error={touched.budget ? errors.budget : undefined}
          />
        </div>
      )}
    </div>
  );
}

export default React.memo(Step2ProjectType);
