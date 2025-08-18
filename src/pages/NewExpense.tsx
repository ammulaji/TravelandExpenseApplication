import { useState } from 'react';

type ExpenseForm = {
  date: string;
  category: string;
  amount: string;
  notes: string;
};

export default function NewExpense() {
  const [form, setForm] = useState<ExpenseForm>({ date: '', category: '', amount: '', notes: '' });

  function update<K extends keyof ExpenseForm>(key: K, value: ExpenseForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    alert('Expense submitted (mock).');
  }

  return (
    <div>
      <div className="h1">Submit Expense</div>
      <form className="card full" onSubmit={submit} style={{ display: 'grid', gap: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <label>
            Date
            <input type="date" value={form.date} onChange={(e) => update('date', e.target.value)} style={{ width: '100%', padding: 10, border: '1px solid var(--border)', borderRadius: 8 }} />
          </label>
          <label>
            Category
            <select value={form.category} onChange={(e) => update('category', e.target.value)} style={{ width: '100%', padding: 10, border: '1px solid var(--border)', borderRadius: 8 }}>
              <option value="">Select</option>
              <option>Flight</option>
              <option>Hotel</option>
              <option>Meals</option>
              <option>Transport</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            Amount
            <input type="number" value={form.amount} onChange={(e) => update('amount', e.target.value)} style={{ width: '100%', padding: 10, border: '1px solid var(--border)', borderRadius: 8 }} />
          </label>
        </div>
        <label>
          Notes
          <textarea rows={4} value={form.notes} onChange={(e) => update('notes', e.target.value)} style={{ width: '100%', padding: 10, border: '1px solid var(--border)', borderRadius: 8 }} />
        </label>
        <div>
          <button className="btn" type="submit">Submit</button>
          <button className="btn secondary" type="reset" style={{ marginLeft: 8 }}>Reset</button>
        </div>
      </form>
    </div>
  );
}

