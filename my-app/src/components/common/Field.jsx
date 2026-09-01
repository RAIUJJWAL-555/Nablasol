import React from 'react';
import { formClasses } from '../../utils/formClasses';
import ErrorMessage from './ErrorMessage';

/**
 * Reusable Field component supporting inputs, selects, and textareas with labels, validation, and accessibility.
 */
export default function Field({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = false,
  hint,
  disabled = false,
  prefix,
  suffix,
  rows = 3,
  options = [],
  children,
  className = '',
  ...props
}) {
  const fieldId = id || name;
  const errorId = error ? `${fieldId}-error` : undefined;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const hasError = Boolean(error);

  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {label && (
        <label htmlFor={fieldId} className={formClasses.label}>
          {label} {required && <span className="text-red-500 font-bold">*</span>}
        </label>
      )}

      {/* Input / Control Wrapper */}
      <div className="relative">
        {prefix && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 text-sm font-medium">
            {prefix}
          </div>
        )}

        {/* 1. Textarea */}
        {type === 'textarea' ? (
          <textarea
            id={fieldId}
            name={name}
            value={value ?? ''}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows}
            aria-invalid={hasError}
            aria-describedby={describedBy}
            className={`${formClasses.textarea(hasError)} ${prefix ? 'pl-9' : ''} ${suffix ? 'pr-16' : ''}`}
            {...props}
          />
        ) : type === 'select' ? (
          /* 2. Select Dropdown */
          <div className="relative">
            <select
              id={fieldId}
              name={name}
              value={value ?? ''}
              onChange={onChange}
              onBlur={onBlur}
              disabled={disabled}
              aria-invalid={hasError}
              aria-describedby={describedBy}
              className={`${formClasses.select(hasError)} ${prefix ? 'pl-9' : ''} pr-10`}
              {...props}
            >
              {options.length > 0
                ? options.map((opt) => (
                    <option
                      key={opt.value}
                      value={opt.value}
                      disabled={opt.disabled || opt.value === ''}
                      className="bg-white text-slate-900"
                    >
                      {opt.label}
                    </option>
                  ))
                : children}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        ) : (
          /* 3. Standard Inputs (text, date, number, email, tel) */
          <input
            id={fieldId}
            name={name}
            type={type}
            value={value ?? ''}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={describedBy}
            className={`${formClasses.input(hasError)} ${prefix ? 'pl-9' : ''} ${suffix ? 'pr-20' : ''}`}
            {...props}
          />
        )}

        {suffix && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 text-xs font-medium">
            {suffix}
          </div>
        )}
      </div>

      {/* Optional Hint Text */}
      {hint && !hasError && (
        <p id={hintId} className="mt-1 text-[11px] text-slate-400">
          {hint}
        </p>
      )}

      {/* Accessible Error Message */}
      <ErrorMessage id={errorId} error={error} />
    </div>
  );
}
