import React from 'react';
import whiteCatHeroImg from '../assets/white-cat-hero.jpg';

/**
 * Full-screen, single-viewport project submission summary view with smooth staggered reveal animations.
 */
export default function SubmissionSuccessView({
  formData = {},
  completedCount = 4,
  onStartNew,
  onEditForm,
}) {
  return (
    <div className="w-screen h-screen max-h-screen bg-white text-slate-900 antialiased flex flex-col lg:flex-row overflow-hidden select-none animate-page-reveal">
      
      {/* LEFT SECTION: White Cat Image (Flush 0px to left edge, smooth slide-in) */}
      <div className="hidden sm:block sm:h-44 lg:h-full w-full lg:w-5/12 xl:w-1/2 relative p-0 m-0 bg-white overflow-hidden flex-shrink-0 animate-slide-in-left">
        <img
          src={whiteCatHeroImg}
          alt="White Cat Portrait"
          loading="eager"
          decoding="async"
          fetchpriority="high"
          className="w-full h-full object-cover object-left-top lg:object-cover select-none pointer-events-none transition-transform duration-1000 ease-out hover:scale-102"
        />
        {/* Soft edge blend */}
        <div className="hidden lg:block absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-white pointer-events-none" />
      </div>

      {/* RIGHT SECTION: Submission Details (Smooth slide-in) */}
      <div className="flex-1 h-full flex flex-col justify-between p-4 sm:p-6 lg:p-7 xl:p-10 bg-white overflow-hidden animate-slide-in-right">
        
        {/* 1. Top Navigation Bar */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 flex-shrink-0 animate-fade-in-up">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping" />
            <span className="text-[11px] font-black tracking-[0.2em] text-slate-900 uppercase">
              PROJECT PORTAL
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onEditForm}
              className="text-xs font-semibold text-slate-700 hover:text-black px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer"
            >
              Edit Form
            </button>
            <button
              type="button"
              onClick={onStartNew}
              className="text-xs font-bold text-white bg-black hover:bg-slate-800 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer shadow-xs"
            >
              + New Project
            </button>
          </div>
        </div>

        {/* 2. Middle Content Section */}
        <div className="my-auto flex flex-col justify-center gap-3.5 sm:gap-4 py-1.5">
          
          {/* Headline & Meta */}
          <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                Verified Submission • {completedCount}/6 Steps Completed
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                • {new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight line-clamp-1">
              {formData.projectName || 'Enterprise Cloud Infrastructure'}
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium line-clamp-1">
              Client: <span className="font-semibold text-slate-800">{formData.client || 'Acme Corporation'}</span> • Timeline: <span className="font-semibold text-slate-800">{formData.startDate || 'Start'} to {formData.endDate || 'End'}</span>
            </p>
          </div>

          {/* Details Grid (Staggered Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            
            {/* Card 1: Commercials & Billing */}
            <div className="p-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/90 flex flex-col justify-between animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Billing Structure
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-200 text-slate-800">
                    {formData.projectType || 'Time & Materials'}
                  </span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                  {formData.projectType === 'Fixed Fee' && `$${Number(formData.budget || 0).toLocaleString()}`}
                  {formData.projectType === 'Time & Materials' && `$${formData.hourlyRate || 0}/hr`}
                  {formData.projectType === 'Non-billable' && 'Non-billable'}
                </div>
              </div>

              {formData.notes && (
                <p className="text-[11px] text-slate-500 italic mt-1.5 pt-1.5 border-t border-slate-200/60 line-clamp-1">
                  "{formData.notes}"
                </p>
              )}
            </div>

            {/* Card 2: Client Stakeholder Info */}
            <div className="p-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/90 flex flex-col justify-between animate-fade-in-up" style={{ animationDelay: '250ms' }}>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Primary Stakeholder
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {formData.preferredChannel || 'Slack'}
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-900 truncate">
                  {formData.contactName || 'Client Point of Contact'}
                </div>
                <div className="text-xs text-slate-500 truncate mt-0.5">
                  {formData.contactEmail || 'contact@client.com'} • {formData.contactPhone || '—'}
                </div>
              </div>

              <div className="text-[10px] text-slate-400 mt-1.5 pt-1.5 border-t border-slate-200/60 font-medium">
                Designated communication lead
              </div>
            </div>

            {/* Card 3: Assigned Specialists */}
            <div className="p-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/90 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Allocated Team ({formData.team?.length || 0})
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">Ready</span>
              </div>

              <div className="flex flex-wrap gap-1.5 max-h-16 overflow-hidden">
                {formData.team?.map((member) => (
                  <div key={member.id} className="inline-flex items-center gap-1.5 bg-white border border-slate-200/90 px-2 py-1 rounded-lg shadow-2xs">
                    <div className="w-4 h-4 rounded-full bg-black text-white text-[8px] font-bold flex items-center justify-center flex-shrink-0">
                      {member.initials || member.name.charAt(0)}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-800">
                      {member.name}
                    </span>
                    <span className="text-[9px] text-slate-400 font-medium">
                      ({member.role})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 4: Deliverable Scope */}
            <div className="p-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/90 animate-fade-in-up" style={{ animationDelay: '350ms' }}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Deliverable Milestones ({formData.tasks?.length || 0})
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">Approved</span>
              </div>

              <div className="flex flex-wrap gap-1.5 max-h-16 overflow-hidden">
                {formData.tasks?.map((task, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-medium text-slate-700 shadow-2xs truncate max-w-[200px]"
                  >
                    <svg className="w-3 h-3 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="truncate">{task}</span>
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* 3. Bottom CTA Action Bar */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onStartNew}
              className="flex-1 sm:flex-none h-10 px-5 bg-black hover:bg-slate-800 active:bg-slate-900 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md hover:shadow-black/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
              </svg>
              <span>Create Another Project</span>
            </button>

            <button
              type="button"
              onClick={onEditForm}
              className="h-10 px-4 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl transition-all border border-slate-200 cursor-pointer"
            >
              Edit Details
            </button>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium">
            <span>Verified configuration</span>
            <span>•</span>
            <div className="flex items-center gap-2 text-slate-600 font-bold">
              <span>Ujjwal</span>
              <span>Rai</span>
              <span className="italic font-serif">To Nablasol</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
