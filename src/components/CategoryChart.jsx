import React, { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoryChart({ expenses }){
  const data = useMemo(()=> {
    const byCategory = expenses.reduce((acc,e) => {
      acc[e.category] = (acc[e.category] || 0) + Number(e.amount || 0);
      return acc;
    }, {});
    const labels = Object.keys(byCategory);
    const values = Object.values(byCategory);
    return {
      labels,
      datasets: [{ label: 'Expenses', data: values }]
    };
  }, [expenses]);

  if(!data.labels || data.labels.length === 0) return <div className='text-black'>No chart data</div>;

  return (
    <div>
      <h3 className="font-semibold mb-3 text-black">Category Chart</h3>
      <div className="max-w-md mx-auto">
        <Doughnut data={data} />
      </div>
    </div>
  );
}
