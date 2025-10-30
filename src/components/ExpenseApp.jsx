import React, { useEffect, useState } from 'react';
import API from '../api/api';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import Summary from './Summary';
import CategoryChart from './CategoryChart';
import dayjs from 'dayjs';

export default function ExpenseApp(){
  const [expenses, setExpenses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [filters, setFilters] = useState({ category:'', startDate:'', endDate:'' });
  const [loading, setLoading] = useState(false);

  const fetchExpenses = async (qs) => {
    setLoading(true);
    try {
      const params = {};
      if(filters.category) params.category = filters.category;
      if(filters.startDate) params.startDate = filters.startDate;
      if(filters.endDate) params.endDate = filters.endDate;
      const res = await API.get('/expenses', { params });
      setExpenses(res.data);
    } catch(err){ console.error(err); }
    setLoading(false);
  };

  useEffect(()=> { fetchExpenses(); }, []);

  const addExpense = async (data) => {
    try {
      const res = await API.post('/expenses', data);
      setExpenses(prev => [res.data, ...prev]);
    } catch(err){ console.error(err); }
  };

  const updateExpense = async (id, data) => {
    try {
      const res = await API.put(`/expenses/${id}`, data);
      setExpenses(prev => prev.map(e => e._id === id ? res.data : e));
      setEditing(null);
    } catch(err){ console.error(err); }
  };

  const deleteExpense = async (id) => {
    if(!confirm('Delete this expense?')) return;
    try {
      await API.delete(`/expenses/${id}`);
      setExpenses(prev => prev.filter(e => e._id !== id));
    } catch(err){ console.error(err); }
  };

  const applyFilters = () => {
    
    fetchExpenses();
  };

  const clearFilters = () => {
    setFilters({ category:'', startDate:'', endDate:'' });
    fetchExpenses();
  };

  const categories = Array.from(new Set(expenses.map(e=>e.category))).sort();

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <ExpenseForm onAdd={addExpense} editing={editing} onUpdate={updateExpense} onCancel={()=>setEditing(null)} />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2 text-black">Filters</h2>
          <div className="space-y-2 text-bg">
            <select value={filters.category} onChange={e=>setFilters({...filters, category: e.target.value})}
              className="w-full p-2 border rounded">
              <option value="">All categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <div className="flex gap-2 text-bg">
              <input type="date" value={filters.startDate} onChange={e=>setFilters({...filters, startDate:e.target.value})} className="p-2 border rounded w-full" />
              <input type="date" value={filters.endDate} onChange={e=>setFilters({...filters, endDate:e.target.value})} className="p-2 border rounded w-full" />
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded" onClick={applyFilters}>Apply</button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded" onClick={clearFilters}>Clear</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 ">
        <div className="md:col-span-2 bg-white p-4 rounded shadow ">
          <h2 className="font-semibold mb-2 text-black">Expenses {loading && '(loading...)'}</h2>
          <ExpenseList expenses={expenses} onEdit={e=>setEditing(e)} onDelete={deleteExpense} />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <Summary expenses={expenses} />
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <CategoryChart expenses={expenses} />
      </div>
    </div>
  );
}
