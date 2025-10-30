import React, { useMemo } from 'react';

export default function Summary({ expenses }){
  const total = useMemo(()=> expenses.reduce((s,e)=> s + (Number(e.amount)||0), 0), [expenses]);

  const byCategory = useMemo(()=> {
    return expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + Number(e.amount || 0);
      return acc;
    }, {});
  }, [expenses]);

  return (
    <div>
      <h3 className="font-semibold mb-2">Summary</h3>
      <div className="text-xl font-bold mb-4">Total: ₹{total.toFixed(2)}</div>
      <div>
        <h4 className="font-medium mb-1">By Category</h4>
        <ul className="space-y-1">
          {Object.entries(byCategory).length === 0 && <li className="text-sm text-gray-500">No data</li>}
          {Object.entries(byCategory).map(([cat, amt]) => (
            <li key={cat} className="flex justify-between">
              <span>{cat}</span>
              <span>₹{amt.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
