import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

export default function ExpenseForm({ onAdd, editing, onUpdate, onCancel }){
  const [form, setForm] = useState({ title:'', amount:'', category:'', date: dayjs().format('YYYY-MM-DD') });

  useEffect(()=> {
    if(editing){
      setForm({
        title: editing.title,
        amount: editing.amount,
        category: editing.category,
        date: dayjs(editing.date).format('YYYY-MM-DD')
      });
    }
  }, [editing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!form.title || form.amount === '' || !form.category || !form.date){
      alert('Please fill all fields');
      return;
    }
    const payload = { ...form, amount: Number(form.amount), date: new Date(form.date) };
    if(editing) onUpdate(editing._id, payload);
    else {
      onAdd(payload);
      setForm({ title:'', amount:'', category:'', date: dayjs().format('YYYY-MM-DD') });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 ">
      <h2 className="font-semibold text-black">{editing ? 'Edit Expense' : 'Add Expense'}</h2>
      <input placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} className="text-bg w-full p-2 border rounded" />
      <input placeholder="Amount" type="number" step="0.01" value={form.amount} onChange={e=>setForm({...form, amount:e.target.value})} className="w-full p-2 text-bg border rounded" />
      <input placeholder="Category (eg. Food, Travel)" value={form.category} onChange={e=>setForm({...form, category:e.target.value})} className="w-full p-2 text-bg border rounded" />
      <input type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} className="w-full text-bg p-2 border rounded" />
      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">{editing ? 'Update' : 'Add'}</button> 
      </div>
    </form>
  );
}
