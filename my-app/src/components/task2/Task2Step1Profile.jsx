import React from 'react';
import Field from '../common/Field';

/**
 * Task 2 - Step 1: Personal Profile
 */
export default function Task2Step1Profile({ formData, errors = {}, touched = {}, onChange, onBlur }) {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="border-b border-slate-100 pb-3 mb-4">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">Personal Profile</h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Provide your legal identity, contact email, phone, and secure password.
        </p>
      </div>

      {/* 1 & 2. First Name & Last Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          id="firstName"
          name="firstName"
          label="First Name"
          required
          value={formData.firstName}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Name"
          error={touched.firstName ? errors.firstName : undefined}
        />

        <Field
          id="lastName"
          name="lastName"
          label="Last Name"
          required
          value={formData.lastName}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Last Name"
          error={touched.lastName ? errors.lastName : undefined}
        />
      </div>

      {/* 3 & 4. Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          id="email"
          name="email"
          label="Email"
          type="email"
          required
          value={formData.email}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="example@company.com"
          error={touched.email ? errors.email : undefined}
        />

        <Field
          id="phone"
          name="phone"
          label="Phone"
          type="tel"
          required
          value={formData.phone}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="+91 1111111111"
          error={touched.phone ? errors.phone : undefined}
        />
      </div>

      {/* 5 & 6. Password & Confirm Password */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          id="password"
          name="password"
          label="Password"
          type="password"
          required
          value={formData.password}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Min 8 characters"
          hint="Must be at least 8 characters"
          error={touched.password ? errors.password : undefined}
        />

        <Field
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          required
          value={formData.confirmPassword}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Re-enter password"
          error={touched.confirmPassword ? errors.confirmPassword : undefined}
        />
      </div>
    </div>
  );
}
