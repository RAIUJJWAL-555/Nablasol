import React, { useState } from 'react';

export const DUMMY_USERS = [
  { id: 'u1', name: 'Ram', role: 'Frontend Engineer', email: 'ram@example.com', initials: 'RM' },
  { id: 'u2', name: 'Shyam', role: 'Backend Engineer', email: 'shyam@example.com', initials: 'SH' },
  { id: 'u3', name: 'Ghanshyam', role: 'UI/UX Designer', email: 'ghanshyam@example.com', initials: 'GH' },
  { id: 'u4', name: 'Sita', role: 'Project Manager', email: 'sita@example.com', initials: 'ST' },
  { id: 'u5', name: 'Gita', role: 'DevOps Engineer', email: 'gita@example.com', initials: 'GT' },
  { id: 'u6', name: 'Sunita', role: 'QA Lead', email: 'sunita@example.com', initials: 'SN' },
];

export default function TeamStep({ formData, setFormData, errors = {} }) {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [inputError, setInputError] = useState('');

  const handleAddMember = () => {
    if (!selectedUserId) {
      setInputError('Please select a user from the dropdown.');
      return;
    }

    const userToAdd = DUMMY_USERS.find((u) => u.id === selectedUserId);
    if (!userToAdd) return;

    const isAlreadyMember = formData.team.some((m) => m.id === userToAdd.id);
    if (isAlreadyMember) {
      setInputError(`${userToAdd.name} is already in the team.`);
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
    <div className="space-y-4 sm:space-y-5">
      {/* Header & Counter */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-base font-bold text-slate-900 tracking-tight">Team Allocation</h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Assign team members and technical specialists to this project.
          </p>
        </div>
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-800 border border-slate-200">
          {formData.team.length} {formData.team.length === 1 ? 'Member' : 'Members'}
        </span>
      </div>

      {/* Dropdown + Add Member Button */}
      <div>
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <select
              value={selectedUserId}
              onChange={(e) => {
                setSelectedUserId(e.target.value);
                if (inputError) setInputError('');
              }}
              className={`w-full h-11 appearance-none px-4 bg-slate-50/80 border rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 transition-all cursor-pointer ${
                inputError
                  ? 'border-red-400 focus:ring-red-500/20 bg-red-50/30'
                  : 'border-slate-200 hover:border-slate-300 focus:border-black focus:ring-black/10'
              }`}
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

        {inputError && (
          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {inputError}
          </p>
        )}
      </div>

      {errors.team && (
        <p className="text-xs text-red-500 font-medium">{errors.team}</p>
      )}

      {/* Selected Members Cards List */}
      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
        {formData.team.length === 0 ? (
          <div className="text-center py-6 px-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/50">
            <p className="text-xs text-slate-500 font-medium">No team members assigned.</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Select a member above and click "Add Member".
            </p>
          </div>
        ) : (
          formData.team.map((member) => (
            <div
              key={member.id}
              className="group flex items-center justify-between bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200 p-3 rounded-xl transition-all"
            >
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 text-white font-semibold text-xs flex items-center justify-center flex-shrink-0 shadow-xs ring-2 ring-indigo-100">
                  {member.initials || member.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                      {member.name}
                    </p>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-indigo-700 font-medium border border-indigo-100 shadow-2xs">
                      {member.role}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {member.email}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleRemoveMember(member.id)}
                aria-label={`Remove ${member.name}`}
                className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-all flex-shrink-0 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
