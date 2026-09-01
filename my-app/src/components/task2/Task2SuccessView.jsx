import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Task 2 Success View
 */
export default function Task2SuccessView({ formData, onReset }) {
  return (
    <div className="text-center py-6 animate-fade-in select-none">
      {/* Success Badge Icon */}
      <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-black/10">
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
        Business Account Registered!
      </h2>
      <p className="text-xs sm:text-sm text-slate-500 mb-6 max-w-sm mx-auto">
        Welcome aboard, <span className="font-semibold text-slate-900">{formData.firstName} {formData.lastName}</span>! <span className="font-semibold text-slate-900">{formData.companyName}</span> has been configured.
      </p>

      {/* Profile & Business Overview Card */}
      <div className="max-w-md mx-auto bg-slate-50/80 border border-slate-200/90 rounded-2xl p-5 text-left text-xs sm:text-sm space-y-2.5 mb-6">
        
        {/* Section 1: Profile */}
        <div className="pb-2 border-b border-slate-200/80">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            1. Authorized Profile
          </span>
          <div className="space-y-1 text-slate-700">
            <div className="flex justify-between">
              <span className="text-slate-400 font-medium">Name:</span>
              <span className="font-bold text-slate-900">{formData.firstName} {formData.lastName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-medium">Email:</span>
              <span className="font-semibold text-slate-800">{formData.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-medium">Phone:</span>
              <span className="text-slate-700">{formData.phone}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Business Info */}
        <div className="pt-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            2. Registered Business Details
          </span>
          <div className="space-y-1 text-slate-700">
            <div className="flex justify-between">
              <span className="text-slate-400 font-medium">Company:</span>
              <span className="font-bold text-slate-900">{formData.companyName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-medium">Location:</span>
              <span className="text-slate-800">{formData.address}, {formData.city} {formData.zipCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-medium">Tax ID / Registration:</span>
              <span className="font-mono font-semibold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 text-xs">{formData.taxId}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto h-11 px-6 bg-black hover:bg-slate-800 active:bg-slate-900 text-white font-semibold rounded-xl text-sm transition-all shadow-md hover:shadow-black/20 cursor-pointer inline-flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Register Another</span>
        </button>

        <Link
          to="/"
          className="w-full sm:w-auto h-11 px-5 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-semibold rounded-xl text-sm transition-all border border-slate-200 inline-flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Back to Home</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
