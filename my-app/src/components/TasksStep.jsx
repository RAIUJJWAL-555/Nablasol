import React, { useState } from 'react';

export default function TasksStep({ formData, setFormData, errors = {} }) {
  const [taskInput, setTaskInput] = useState('');
  const [inputError, setInputError] = useState('');

  const handleAddTask = (e) => {
    if (e) e.preventDefault();

    const trimmedTask = taskInput.trim();
    if (!trimmedTask) {
      setInputError('Please enter a task description.');
      return;
    }

    setFormData((prev) => ({
      ...prev,
      tasks: [...prev.tasks, trimmedTask],
    }));

    setTaskInput('');
    setInputError('');
  };

  const handleDeleteTask = (indexToDelete) => {
    setFormData((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((_, index) => index !== indexToDelete),
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTask();
    }
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Header & Counter */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-base font-bold text-white tracking-tight">Project Tasks</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Key milestones, deliverables, and scope items.
          </p>
        </div>
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
          {formData.tasks.length} {formData.tasks.length === 1 ? 'Task' : 'Tasks'}
        </span>
      </div>

      {/* Input Group */}
      <div>
        <div className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => {
              setTaskInput(e.target.value);
              if (inputError) setInputError('');
            }}
            onKeyDown={handleKeyDown}
            placeholder="e.g. Design UI Wireframes & Mockups"
            className={`flex-1 h-11 px-4 bg-slate-900/70 border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
              inputError
                ? 'border-red-500/80 focus:ring-red-500/40 bg-red-950/10'
                : 'border-slate-700/80 focus:border-indigo-500 focus:ring-indigo-500/30'
            }`}
          />

          <button
            type="button"
            onClick={handleAddTask}
            className="h-11 px-5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-all shadow-md hover:shadow-indigo-500/20 flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            Add Task
          </button>
        </div>

        {inputError && (
          <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {inputError}
          </p>
        )}
      </div>

      {errors.tasks && (
        <p className="text-xs text-red-400 font-medium">{errors.tasks}</p>
      )}

      {/* Task List */}
      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
        {formData.tasks.length === 0 ? (
          <div className="text-center py-6 px-4 rounded-xl border border-dashed border-slate-700/80 bg-slate-900/30">
            <p className="text-xs text-slate-400 font-medium">No tasks added yet.</p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Add your first deliverable using the input above.
            </p>
          </div>
        ) : (
          formData.tasks.map((task, index) => (
            <div
              key={index}
              className="group flex items-center justify-between bg-slate-900/50 hover:bg-slate-900/80 border border-slate-700/60 hover:border-slate-600 px-3.5 py-2.5 rounded-xl transition-all"
            >
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <span className="w-5 h-5 rounded-lg bg-slate-800 text-slate-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-xs sm:text-sm text-slate-200 truncate font-medium">
                  {task}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleDeleteTask(index)}
                aria-label={`Delete task ${task}`}
                className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 p-1.5 rounded-lg transition-all flex-shrink-0 cursor-pointer"
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
