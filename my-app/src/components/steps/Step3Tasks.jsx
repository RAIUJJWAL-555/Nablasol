import React, { useState } from 'react';
import ErrorMessage from '../common/ErrorMessage';
import { formClasses } from '../../utils/formClasses';

/**
 * Step 3: Tasks & Deliverables (Array management with Add/Remove)
 */
function Step3Tasks({ formData, setFormData, errors = {}, touched = {} }) {
  const [taskInput, setTaskInput] = useState('');
  const [inputError, setInputError] = useState('');

  const handleAddTask = (e) => {
    if (e) e.preventDefault();

    const trimmedTask = taskInput.trim();
    if (!trimmedTask) {
      setInputError('Please enter a task description.');
      return;
    }

    if (formData.tasks.includes(trimmedTask)) {
      setInputError('This task has already been added.');
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
    <div className="space-y-4 sm:space-y-5 animate-fade-in">
      {/* Header & Counter */}
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Tasks & Scope</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Define deliverables, work packages, and scope items.
          </p>
        </div>
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-800 border border-slate-200 flex-shrink-0">
          {formData.tasks.length} {formData.tasks.length === 1 ? 'Task' : 'Tasks'}
        </span>
      </div>

      {/* Input Group */}
      <div>
        <label htmlFor="taskInput" className={formClasses.label}>
          Add Deliverable <span className="text-red-500 font-bold">*</span>
        </label>
        <div className="flex flex-col sm:flex-row gap-2.5">
          <input
            id="taskInput"
            type="text"
            value={taskInput}
            onChange={(e) => {
              setTaskInput(e.target.value);
              if (inputError) setInputError('');
            }}
            onKeyDown={handleKeyDown}
            placeholder="e.g. Design High-Fidelity UI Wireframes & Prototypes"
            className={formClasses.input(Boolean(inputError))}
          />

          <button
            type="button"
            onClick={handleAddTask}
            className="h-11 px-5 bg-black hover:bg-slate-800 active:bg-slate-900 text-white text-sm font-semibold rounded-xl transition-all shadow-sm hover:shadow-black/20 flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            Add Task
          </button>
        </div>

        <ErrorMessage error={inputError} />
      </div>

      {/* Step validation error */}
      {touched.tasks && errors.tasks && (
        <ErrorMessage error={errors.tasks} />
      )}

      {/* Task List */}
      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
        {formData.tasks.length === 0 ? (
          <div className="text-center py-7 px-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50">
            <p className="text-xs text-slate-500 font-semibold">No deliverables added yet.</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Add at least one key deliverable to complete this step.
            </p>
          </div>
        ) : (
          formData.tasks.map((task, index) => (
            <div
              key={index}
              className="group flex items-center justify-between bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200 px-3.5 py-2.5 rounded-xl transition-all"
            >
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <span className="w-5 h-5 rounded-lg bg-white border border-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center flex-shrink-0 shadow-2xs">
                  {index + 1}
                </span>
                <span className="text-xs sm:text-sm text-slate-800 truncate font-medium">
                  {task}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleDeleteTask(index)}
                aria-label={`Delete task ${task}`}
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

export default React.memo(Step3Tasks);
