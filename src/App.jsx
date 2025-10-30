import React from 'react';
import ExpenseApp from './components/ExpenseApp';

export default function App(){
  return (
    <div className="min-h-screen bg-black-50 p-4 md:p-8">
      <div className="max-w-5x2 mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold text-bg mb-6">Expense Tracker</h1>
        <ExpenseApp />
      </div>
    </div>
  );
}
