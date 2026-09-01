import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Task1 = lazy(() => import('./pages/Task1'));
const Task2 = lazy(() => import('./pages/Task2'));

/**
 * Lightweight Route Loading Fallback
 */
function RouteLoadingFallback() {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center p-6 select-none animate-fade-in">
      <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-black animate-spin mb-3" />
      <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Loading...</span>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteLoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task1" element={<Task1 />} />
          <Route path="/task2" element={<Task2 />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
