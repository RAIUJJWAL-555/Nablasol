import React from 'react';
import Field from '../common/Field';

/**
 * Task 2 - Step 2: Business Info
 */
export default function Task2Step2Business({ formData, errors = {}, touched = {}, onChange, onBlur }) {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="border-b border-slate-100 pb-3 mb-4">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">Business Information</h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Enter legal organization credentials, location, and tax identification.
        </p>
      </div>

      {/* 1. Company Name */}
      <Field
        id="companyName"
        name="companyName"
        label="Company Name"
        required
        value={formData.companyName}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="e.g. Acme Innovations LLC"
        error={touched.companyName ? errors.companyName : undefined}
      />

      {/* 2. Street Address */}
      <Field
        id="address"
        name="address"
        label="Address"
        required
        value={formData.address}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="e.g. 742 Evergreen Terrace, Suite 100"
        error={touched.address ? errors.address : undefined}
      />

      {/* 3 & 4. City & ZIP Code */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          id="city"
          name="city"
          label="City"
          required
          value={formData.city}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="e.g. Springfield"
          error={touched.city ? errors.city : undefined}
        />

        <Field
          id="zip"
          name="zip"
          label="ZIP Code"
          required
          value={formData.zip !== undefined ? formData.zip : formData.zipCode}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="e.g. 97477"
          hint="Numeric digits only"
          error={touched.zip || touched.zipCode ? errors.zip || errors.zipCode : undefined}
        />
      </div>

      {/* 5. Tax ID */}
      <Field
        id="taxId"
        name="taxId"
        label="Tax ID"
        required
        value={formData.taxId}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="e.g. 12-3456789 or GSTIN"
        error={touched.taxId ? errors.taxId : undefined}
      />
    </div>
  );
}
