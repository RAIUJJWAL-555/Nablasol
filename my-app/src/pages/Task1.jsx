import React from 'react';
import { Link } from 'react-router-dom';
import MultiStepForm from '../components/MultiStepForm';

/**
 * Task 1 Page: 6-Step Multi-Step Project Form
 */
export default function Task1() {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      {/* Top Header Bar for Task Switcher */}
      <header className="w-full bg-white border-b border-slate-100 px-4 sm:px-8 py-3 flex items-center justify-between select-none z-20">
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-black bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-all shadow-2xs"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Home</span>
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-xs font-bold text-slate-900">Task 1 • Multi-Step Project Form</span>
        </div>

        <Link
          to="/task2"
          className="text-xs font-semibold text-slate-600 hover:text-black bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 transition-all shadow-2xs"
        >
          Go to Task 2 →
        </Link>
      </header>

      {/* Form View */}
      <main className="flex-1 w-full">
        <MultiStepForm />
      </main>
    </div>
  );
}
