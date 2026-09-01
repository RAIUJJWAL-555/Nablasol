import React from 'react';
import ErrorMessage from '../common/ErrorMessage';
import { STEPS_CONFIG } from '../common/Stepper';

/**
 * Step 6: Review & Final Confirmation
 */
function Step6Review({
  formData,
  stepValidity = {},
  completedCount = 0,
  errors = {},
  touched = {},
  onChange,
  onJumpToStep,
}) {
  const isStep1Valid = Boolean(stepValidity[1]);
  const isReady = isStep1Valid && completedCount >= 4;

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">Review & Confirmation</h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Verify completed sections and finalize project submission.
        </p>
      </div>

      {/* Submission Readiness Banner */}
      <div
        className={`p-4 rounded-2xl border transition-all ${
          isReady
            ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
            : 'bg-amber-50/80 border-amber-200 text-amber-900'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isReady ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`}
            />
            <div>
              <h4 className="text-sm font-bold tracking-tight">
                {isReady
                  ? `${completedCount} of 6 Steps Valid — Ready to Submit!`
                  : !isStep1Valid
                  ? 'Step 1 (Project & Client Info) is mandatory and must be completed'
                  : `Need at least 4 completed steps (${completedCount}/6 completed)`}
              </h4>
              <p className="text-xs opacity-80 mt-0.5">
                {isReady
                  ? 'All requirements met (Project Info + 3 other sections). Confirm below to publish project.'
                  : !isStep1Valid
                  ? 'Please click "Edit" on Step 1 to fill in required Project Name and Client organization.'
                  : 'Please complete any remaining optional sections to reach at least 4 valid steps.'}
              </p>
            </div>
          </div>

          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-white/80 border border-current shadow-2xs flex-shrink-0">
            {completedCount}/6 Valid
          </span>
        </div>
      </div>

      {/* 6-Step Breakdown Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
        {/* Step 1 Card */}
        <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${stepValidity[1] ? 'bg-emerald-500' : 'bg-slate-300'}`} />
              <span className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                1. Project Info
              </span>
            </div>
            <button
              type="button"
              onClick={() => onJumpToStep(1)}
              className="text-xs text-black hover:text-slate-600 font-semibold underline cursor-pointer"
            >
              Edit
            </button>
          </div>
          <div className="space-y-1 text-slate-600">
            <p className="truncate"><strong className="text-slate-500">Name:</strong> {formData.projectName || '—'}</p>
            <p><strong className="text-slate-500">Client:</strong> {formData.client || '—'}</p>
            <p><strong className="text-slate-500">Dates:</strong> {formData.startDate && formData.endDate ? `${formData.startDate} to ${formData.endDate}` : '—'}</p>
          </div>
        </div>

        {/* Step 2 Card */}
        <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${stepValidity[2] ? 'bg-emerald-500' : 'bg-slate-300'}`} />
              <span className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                2. Billing Model
              </span>
            </div>
            <button
              type="button"
              onClick={() => onJumpToStep(2)}
              className="text-xs text-black hover:text-slate-600 font-semibold underline cursor-pointer"
            >
              Edit
            </button>
          </div>
          <div className="space-y-1 text-slate-600">
            <p><strong className="text-slate-500">Type:</strong> {formData.projectType || '—'}</p>
            {formData.projectType === 'Time & Materials' && (
              <p><strong className="text-slate-500">Rate:</strong> ${formData.hourlyRate}/hr</p>
            )}
            {formData.projectType === 'Fixed Fee' && (
              <p><strong className="text-slate-500">Budget:</strong> ${Number(formData.budget || 0).toLocaleString()}</p>
            )}
          </div>
        </div>

        {/* Step 3 Card */}
        <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${stepValidity[3] ? 'bg-emerald-500' : 'bg-slate-300'}`} />
              <span className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                3. Deliverables Scope
              </span>
            </div>
            <button
              type="button"
              onClick={() => onJumpToStep(3)}
              className="text-xs text-black hover:text-slate-600 font-semibold underline cursor-pointer"
            >
              Edit
            </button>
          </div>
          <p className="text-slate-600 line-clamp-2">
            <strong className="text-slate-500">Tasks ({formData.tasks.length}):</strong>{' '}
            {formData.tasks.length > 0 ? formData.tasks.join(', ') : 'None added'}
          </p>
        </div>

        {/* Step 4 Card */}
        <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${stepValidity[4] ? 'bg-emerald-500' : 'bg-slate-300'}`} />
              <span className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                4. Team Roster
              </span>
            </div>
            <button
              type="button"
              onClick={() => onJumpToStep(4)}
              className="text-xs text-black hover:text-slate-600 font-semibold underline cursor-pointer"
            >
              Edit
            </button>
          </div>
          <p className="text-slate-600 line-clamp-2">
            <strong className="text-slate-500">Team ({formData.team.length}):</strong>{' '}
            {formData.team.length > 0 ? formData.team.map((m) => m.name).join(', ') : 'None assigned'}
          </p>
        </div>

        {/* Step 5 Card */}
        <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-3.5 sm:col-span-2 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${stepValidity[5] ? 'bg-emerald-500' : 'bg-slate-300'}`} />
              <span className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                5. Client Stakeholder Contacts
              </span>
            </div>
            <button
              type="button"
              onClick={() => onJumpToStep(5)}
              className="text-xs text-black hover:text-slate-600 font-semibold underline cursor-pointer"
            >
              Edit
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-600">
            <p className="truncate"><strong className="text-slate-500">Contact:</strong> {formData.contactName || '—'}</p>
            <p className="truncate"><strong className="text-slate-500">Email:</strong> {formData.contactEmail || '—'}</p>
            <p className="truncate"><strong className="text-slate-500">Phone:</strong> {formData.contactPhone || '—'}</p>
          </div>
        </div>
      </div>

      {/* Confirmation Checkbox */}
      <div className="pt-2 border-t border-slate-100">
        <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-slate-300 cursor-pointer select-none transition-all">
          <input
            type="checkbox"
            name="isConfirmed"
            checked={Boolean(formData.isConfirmed)}
            onChange={onChange}
            className="mt-0.5 w-4 h-4 rounded text-black focus:ring-black/20 accent-black cursor-pointer"
          />
          <div className="text-xs sm:text-sm">
            <span className="font-bold text-slate-900 block">
              I confirm the project details and scope configuration are accurate.
            </span>
            <span className="text-slate-500 text-xs mt-0.5 block">
              Ready to publish project configuration and allocate designated team members.
            </span>
          </div>
        </label>

        {touched.confirmation && errors.confirmation && (
          <ErrorMessage error={errors.confirmation} className="mt-2" />
        )}
      </div>
    </div>
  );
}

export default React.memo(Step6Review);
