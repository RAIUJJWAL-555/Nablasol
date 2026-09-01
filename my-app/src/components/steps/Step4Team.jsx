import React, { useState } from 'react';
import ErrorMessage from '../common/ErrorMessage';
import { formClasses } from '../../utils/formClasses';

export const DUMMY_USERS = [
  { id: 'usr_1', name: 'Ram', role: 'Lead Architect', initials: 'R' },
  { id: 'usr_2', name: 'Shyam', role: 'Full Stack Engineer', initials: 'S' },
  { id: 'usr_3', name: 'Ghanshyam', role: 'DevOps & Cloud Specialist', initials: 'G' },
  { id: 'usr_4', name: 'Sita', role: 'UI/UX Product Designer', initials: 'SI' },
  { id: 'usr_5', name: 'Gita', role: 'QA & Automation Engineer', initials: 'GI' },
  { id: 'usr_6', name: 'Sunita', role: 'Technical Project Manager', initials: 'SU' },
];

/**
 * Step 4: Team Allocation (Ram, Shyam, Ghanshyam, Sita, Gita, Sunita)
 */
export default function Step4Team({ formData, setFormData, errors = {}, touched = {} }) {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [inputError, setInputError] = useState('');

  const handleAddMember = (e) => {
    if (e) e.preventDefault();

    if (!selectedUserId) {
      setInputError('Please select a team member to assign.');
      return;
    }

    const userToAdd = DUMMY_USERS.find((u) => u.id === selectedUserId);
    if (!userToAdd) return;

    if (formData.team.some((member) => member.id === userToAdd.id)) {
      setInputError('This team member is already assigned to this project.');
      return;
    }

    setFormData((prev) => ({
      ...prev,
      team: [...prev.team, userToAdd],
    }));

    setSelectedUserId('');
    setInputError('');
  };

  const handleRemoveMember = (userIdToRemove) => {
    setFormData((prev) => ({
      ...prev,
      team: prev.team.filter((member) => member.id !== userIdToRemove),
    }));
  };

  return (
    <div className="space-y-4 sm:space-y-5 animate-fade-in">
      {/* Header & Counter */}
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Team Allocation</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Assign team specialists and project contributors.
          </p>
        </div>
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-800 border border-slate-200 flex-shrink-0">
          {formData.team.length} {formData.team.length === 1 ? 'Member' : 'Members'}
        </span>
      </div>

      {/* Dropdown + Add Member Button */}
      <div>
        <label htmlFor="teamSelect" className={formClasses.label}>
          Select Team Specialist <span className="text-red-500 font-bold">*</span>
        </label>
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <select
              id="teamSelect"
              value={selectedUserId}
              onChange={(e) => {
                setSelectedUserId(e.target.value);
                if (inputError) setInputError('');
              }}
              className={formClasses.select(Boolean(inputError))}
            >
              <option value="" disabled className="bg-white text-slate-400">
                Choose a team member to assign...
              </option>
              {DUMMY_USERS.map((user) => {
                const isAlreadyAdded = formData.team.some((m) => m.id === user.id);
                return (
                  <option
                    key={user.id}
                    value={user.id}
                    disabled={isAlreadyAdded}
                    className="bg-white text-slate-900 disabled:text-slate-400"
                  >
                    {user.name} — {user.role} {isAlreadyAdded ? '(Assigned)' : ''}
                  </option>
                );
              })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddMember}
            className="h-11 px-5 bg-black hover:bg-slate-800 active:bg-slate-900 text-white text-sm font-semibold rounded-xl transition-all shadow-sm hover:shadow-black/20 flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            Add Member
          </button>
        </div>

        <ErrorMessage error={inputError} />
      </div>

      {/* Step validation error */}
      {touched.team && errors.team && (
        <ErrorMessage error={errors.team} />
      )}

      {/* Roster List */}
      <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
        {formData.team.length === 0 ? (
          <div className="text-center py-7 px-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50">
            <p className="text-xs text-slate-500 font-semibold">No team members assigned.</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Select specialists from the dropdown to assign to this project.
            </p>
          </div>
        ) : (
          formData.team.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200 p-3 rounded-xl transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center shadow-xs">
                  {member.initials || member.name.charAt(0)}
                </div>
                <div>
                  <h5 className="text-xs sm:text-sm font-semibold text-slate-900 leading-tight">
                    {member.name}
                  </h5>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {member.role}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleRemoveMember(member.id)}
                aria-label={`Remove ${member.name}`}
                className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
