import React from 'react';

/**
 * Accessible inline error message component with warning icon.
 */
function ErrorMessage({ id, error, className = '' }) {
  if (!error) return null;

  return (
    <p
      id={id}
      role="alert"
      aria-live="polite"
      className={`mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1.5 animate-fade-in ${className}`}
    >
      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      <span>{error}</span>
    </p>
  );
}

export default React.memo(ErrorMessage);
