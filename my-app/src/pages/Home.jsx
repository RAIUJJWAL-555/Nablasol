import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Home Navigation Page with links to Task 1 and Task 2
 */
export default function Home() {
  return (
    <div className="min-h-screen w-full bg-slate-50/70 flex flex-col justify-between p-4 sm:p-8 lg:p-12 select-none">
      
      {/* Header */}
      <header className="w-full max-w-4xl mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full bg-black" />
          <span className="text-xs font-black tracking-[0.2em] text-slate-900 uppercase">
            NABLASOL ASSESSMENT
          </span>
        </div>

        <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-2xs">
          React • Tailwind CSS
        </span>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-4xl mx-auto my-auto py-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-2xs mb-3 uppercase tracking-wider">

            <span>Multi-Step Form Tasks</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Select an Application
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
            Explore both multi-step form tasks built with React, modular components, validation, and localStorage persistence.
          </p>
        </div>

        {/* 2 Task Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Task 1 */}
          <div className="group bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 sm:p-8 flex flex-col justify-between transition-all hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-300/40">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200">
                  Task 1 • 6 Steps
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  Any 4 of 6 Rule
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight group-hover:text-black transition-colors mb-2">
                Multi-Step Project Form
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6 font-medium">
                Comprehensive 6-step project configuration form with flexible 4-of-6 completion requirement, Ram/Shyam team allocation, onBlur validation, dynamic tasks, and full-screen submission reveal.
              </p>

              {/* Feature Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-medium text-slate-600">
                  6 Modular Steps
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-medium text-slate-600">
                  Step Validity Tracking
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-medium text-slate-600">
                  Cat Hero Aesthetics
                </span>
              </div>
            </div>

            <Link
              to="/task1"
              className="w-full h-12 bg-black hover:bg-slate-800 active:bg-slate-900 text-white font-semibold rounded-2xl text-sm transition-all shadow-md hover:shadow-black/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Go to Task 1</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Card 2: Task 2 */}
          <div className="group bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 sm:p-8 flex flex-col justify-between transition-all hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-300/40">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200">
                  Task 2 • 2 Steps
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  Signup Wizard
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight group-hover:text-black transition-colors mb-2">
                Business Signup Wizard
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6 font-medium">
                Sleek 2-step onboarding wizard for personal identity and enterprise business registration. Features single-state controlled inputs, onBlur validation, and separate localStorage persistence.
              </p>

              {/* Feature Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-medium text-slate-600">
                  Profile & Business
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-medium text-slate-600">
                  Single State Object
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-medium text-slate-600">
                  task2Data Storage
                </span>
              </div>
            </div>

            <Link
              to="/task2"
              className="w-full h-12 bg-black hover:bg-slate-800 active:bg-slate-900 text-white font-semibold rounded-2xl text-sm transition-all shadow-md hover:shadow-black/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Go to Task 2</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl mx-auto text-center text-xs text-slate-400 py-4 font-medium">
        Ujjwal Rai • Nablasol Frontend Assessment • Pure React & Tailwind CSS
      </footer>

    </div>
  );
}
