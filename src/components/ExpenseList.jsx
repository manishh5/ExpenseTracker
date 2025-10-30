import React from 'react';
import dayjs from 'dayjs';

export default function ExpenseList({ expenses, onEdit, onDelete }){
  if(!expenses.length) return <div>No expenses yet.</div>;

  return (
    <div className="space-y-3">
      {expenses.map(exp => (
        <div key={exp._id} className="flex items-center justify-between p-3 border rounded">
          <div>
            <div className="font-medium">{exp.title}</div>
            <div className="text-sm text-gray-500">{exp.category} · {dayjs(exp.date).format('DD MMM YYYY')}</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="font-semibold">₹{Number(exp.amount).toFixed(2)}</div>
            <button onClick={()=>onEdit(exp)} className="px-2 py-1 border rounded text-sm text-bg">Edit</button>
            <button onClick={()=>onDelete(exp._id)} className="px-2 py-1 border rounded text-sm text-bg">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
