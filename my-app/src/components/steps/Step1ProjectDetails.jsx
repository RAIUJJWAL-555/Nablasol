import React from 'react';
import Field from '../common/Field';

const CLIENT_OPTIONS = [
  { value: '', label: 'Select a client organization...', disabled: true },
  { value: 'Acme Corporation', label: 'Acme Corporation' },
  { value: 'Stark Industries', label: 'Stark Industries' },
  { value: 'Wayne Enterprises', label: 'Wayne Enterprises' },
  { value: 'Cyberdyne Systems', label: 'Cyberdyne Systems' },
  { value: 'Umbrella Corp', label: 'Umbrella Corp' },
];

/**
 * Step 1: Project Details (Name, Client, Dates, Notes)
 */
function Step1ProjectDetails({ formData, errors = {}, touched = {}, onChange, onBlur }) {
  return (
    <div className="space-y-4 sm:space-y-5 animate-fade-in">
      {/* Step Header */}
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">Project Information</h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Provide basic project identification, client entity, and timeline constraints.
        </p>
      </div>

      {/* 1. Project Name */}
      <Field
        id="projectName"
        name="projectName"
        label="Project Name"
        required
        value={formData.projectName}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="e.g. Acme Enterprise ERP Modernization"
        error={touched.projectName ? errors.projectName : undefined}
      />

      {/* 2. Client Selection */}
      <Field
        id="client"
        name="client"
        label="Client"
        type="select"
        required
        options={CLIENT_OPTIONS}
        value={formData.client}
        onChange={onChange}
        onBlur={onBlur}
        error={touched.client ? errors.client : undefined}
      />

      {/* 3 & 4. Dates in Responsive 2-Col Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          id="startDate"
          name="startDate"
          label="Start Date"
          type="date"
          required
          value={formData.startDate}
          onChange={onChange}
          onBlur={onBlur}
          error={touched.startDate ? errors.startDate : undefined}
        />

        <Field
          id="endDate"
          name="endDate"
          label="End Date"
          type="date"
          required
          value={formData.endDate}
          onChange={onChange}
          onBlur={onBlur}
          error={touched.endDate ? errors.endDate : undefined}
        />
      </div>

      {/* 5. Notes / Description (Optional) */}
      <div className="pt-1">
        <Field
          id="notes"
          name="notes"
          label="Project Notes"
          type="textarea"
          rows={3}
          value={formData.notes}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Add background context, constraints, or key objectives (Optional)..."
          hint="Optional field to document special client instructions."
          error={touched.notes ? errors.notes : undefined}
        />
      </div>
    </div>
  );
}

export default React.memo(Step1ProjectDetails);
