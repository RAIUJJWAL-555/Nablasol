import React from 'react';
import Field from '../common/Field';

const COMMUNICATION_CHANNELS = [
  { value: 'Slack', label: 'Slack Connect Channel' },
  { value: 'Email', label: 'Email Correspondence' },
  { value: 'Phone', label: 'Direct Phone / Mobile' },
  { value: 'Google Meet', label: 'Weekly Google Meet / Zoom' },
];

/**
 * Step 5: Client & Stakeholder Contacts
 */
export default function Step5ClientContact({ formData, errors = {}, touched = {}, onChange, onBlur }) {
  return (
    <div className="space-y-4 sm:space-y-5 animate-fade-in">
      {/* Step Header */}
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">Client Contact & Stakeholder</h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Specify key primary contact details for project coordination and sign-offs.
        </p>
      </div>

      <div className="space-y-4">
        {/* 1. Contact Person Name */}
        <Field
          id="contactName"
          name="contactName"
          label="Primary Stakeholder / Contact Name"
          required
          value={formData.contactName}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="e.g. John Doe / Lead Director"
          error={touched.contactName ? errors.contactName : undefined}
        />

        {/* 2 & 3. Email and Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            id="contactEmail"
            name="contactEmail"
            label="Business Email Address"
            type="email"
            required
            value={formData.contactEmail}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="john.doe@company.com"
            error={touched.contactEmail ? errors.contactEmail : undefined}
          />

          <Field
            id="contactPhone"
            name="contactPhone"
            label="Phone Number"
            type="tel"
            required
            value={formData.contactPhone}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="+1 (555) 019-2834"
            error={touched.contactPhone ? errors.contactPhone : undefined}
          />
        </div>

        {/* 4. Preferred Communication Channel */}
        <Field
          id="preferredChannel"
          name="preferredChannel"
          label="Preferred Communication Channel"
          type="select"
          value={formData.preferredChannel}
          onChange={onChange}
          onBlur={onBlur}
          options={COMMUNICATION_CHANNELS}
          hint="How our team will coordinate updates with the stakeholder."
          error={touched.preferredChannel ? errors.preferredChannel : undefined}
        />
      </div>
    </div>
  );
}
