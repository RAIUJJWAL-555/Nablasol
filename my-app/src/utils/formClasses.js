/**
 * Shared Tailwind CSS utility classes for consistent styling, focus states, and validation states across all form components.
 */

export const formClasses = {
  // Base text input, date, and number input styles
  input: (hasError = false) => `
    w-full h-11 px-4 bg-slate-50/80 border rounded-xl text-sm text-slate-900 placeholder-slate-400
    focus:bg-white focus:outline-none focus:ring-2 transition-all
    ${
      hasError
        ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20 bg-red-50/30'
        : 'border-slate-200 hover:border-slate-300 focus:border-black focus:ring-black/10'
    }
  `.trim().replace(/\s+/g, ' '),

  // Select dropdown styles
  select: (hasError = false) => `
    w-full h-11 appearance-none px-4 bg-slate-50/80 border rounded-xl text-sm text-slate-900
    focus:bg-white focus:outline-none focus:ring-2 transition-all cursor-pointer
    ${
      hasError
        ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20 bg-red-50/30'
        : 'border-slate-200 hover:border-slate-300 focus:border-black focus:ring-black/10'
    }
  `.trim().replace(/\s+/g, ' '),

  // Textarea input styles
  textarea: (hasError = false) => `
    w-full p-4 bg-slate-50/80 border rounded-xl text-sm text-slate-900 placeholder-slate-400
    focus:bg-white focus:outline-none focus:ring-2 transition-all resize-y
    ${
      hasError
        ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20 bg-red-50/30'
        : 'border-slate-200 hover:border-slate-300 focus:border-black focus:ring-black/10'
    }
  `.trim().replace(/\s+/g, ' '),

  // Primary action button (Pure Black)
  buttonPrimary: `
    h-11 px-6 bg-black hover:bg-slate-800 active:bg-slate-900 text-white text-sm font-semibold
    rounded-xl transition-all shadow-md hover:shadow-black/20 flex items-center justify-center gap-2
    cursor-pointer disabled:bg-slate-100 disabled:text-slate-400 disabled:border disabled:border-slate-200
    disabled:cursor-not-allowed disabled:shadow-none
  `.trim().replace(/\s+/g, ' '),

  // Secondary button (Slate)
  buttonSecondary: `
    h-11 px-5 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 text-sm font-semibold
    rounded-xl transition-all border border-slate-200 cursor-pointer shadow-xs flex items-center justify-center gap-2
    disabled:opacity-40 disabled:cursor-not-allowed
  `.trim().replace(/\s+/g, ' '),

  // Form label styling
  label: `block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2`,

  // Section card wrapper
  card: `bg-slate-50/80 border border-slate-200/90 rounded-2xl p-4 sm:p-5`,
};
