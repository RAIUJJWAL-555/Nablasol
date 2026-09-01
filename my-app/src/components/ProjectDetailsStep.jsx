import React from 'react';

const CLIENT_OPTIONS = [
  { value: '', label: 'Select a client' },
  { value: 'acme_corp', label: 'Acme Corporation' },
  { value: 'stark_industries', label: 'Stark Industries' },
  { value: 'wayne_enterprises', label: 'Wayne Enterprises' },
  { value: 'cyberdyne', label: 'Cyberdyne Systems' },
  { value: 'globex', label: 'Globex Corporation' },
];

export default function ProjectDetailsStep({ formData, errors = {}, onChange }) {
  return (
    <div className="space-y-6">
      {/* Step Title & Description */}
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">Project Details</h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Provide the foundational details, timeline, and scope notes for this project.
        </p>
      </div>

      <div className="space-y-5">
        {/* 1. Project Name */}
        <div>
          <label
            htmlFor="projectName"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2"
          >
            Project Name <span className="text-red-500">*</span>
          </label>
          <input
            id="projectName"
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={onChange}
            placeholder="e.g. Enterprise Cloud Infrastructure"
            className={`w-full h-11 px-4 bg-slate-50/80 border rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
              errors.projectName
                ? 'border-red-400 focus:ring-red-500/20 bg-red-50/30'
                : 'border-slate-200 hover:border-slate-300 focus:border-black focus:ring-black/10'
            }`}
          />
          {errors.projectName && (
            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{errors.projectName}</span>
            </p>
          )}
        </div>

        {/* 2. Client Dropdown */}
        <div>
          <label
            htmlFor="client"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2"
          >
            Client <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="client"
              name="client"
              value={formData.client}
              onChange={onChange}
              className={`w-full h-11 appearance-none px-4 bg-slate-50/80 border rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 transition-all cursor-pointer ${
                errors.client
                  ? 'border-red-400 focus:ring-red-500/20 bg-red-50/30'
                  : 'border-slate-200 hover:border-slate-300 focus:border-black focus:ring-black/10'
              }`}
            >
              {CLIENT_OPTIONS.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.value === ''}
                  className="bg-white text-slate-900"
                >
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {errors.client && (
            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{errors.client}</span>
            </p>
          )}
        </div>

        {/* 3 & 4. Dates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div>
            <label
              htmlFor="startDate"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2"
            >
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              id="startDate"
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={onChange}
              className={`w-full h-11 px-4 bg-slate-50/80 border rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 transition-all cursor-pointer ${
                errors.startDate
                  ? 'border-red-400 focus:ring-red-500/20 bg-red-50/30'
                  : 'border-slate-200 hover:border-slate-300 focus:border-black focus:ring-black/10'
              }`}
            />
            {errors.startDate && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{errors.startDate}</span>
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2"
            >
              End Date <span className="text-red-500">*</span>
            </label>
            <input
              id="endDate"
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={onChange}
              className={`w-full h-11 px-4 bg-slate-50/80 border rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 transition-all cursor-pointer ${
                errors.endDate
                  ? 'border-red-400 focus:ring-red-500/20 bg-red-50/30'
                  : 'border-slate-200 hover:border-slate-300 focus:border-black focus:ring-black/10'
              }`}
            />
            {errors.endDate && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{errors.endDate}</span>
              </p>
            )}
          </div>
        </div>

        {/* 5. Notes */}
        <div>
          <label
            htmlFor="notes"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2"
          >
            Notes & Scope (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={onChange}
            rows="3"
            placeholder="Add background context, constraints, or key deliverables..."
            className="w-full p-4 bg-slate-50/80 border border-slate-200 hover:border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all resize-y"
          />
        </div>
      </div>
    </div>
  );
}
