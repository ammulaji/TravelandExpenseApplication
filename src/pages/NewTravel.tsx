import { useState } from 'react';

type TravelForm = {
  destination: string;
  startDate: string;
  endDate: string;
  purpose: string;
};

export default function NewTravel() {
  const [form, setForm] = useState<TravelForm>({ destination: '', startDate: '', endDate: '', purpose: '' });

  function update<K extends keyof TravelForm>(key: K, value: TravelForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    alert('Travel request submitted (mock).');
  }

  return (
    <div>
      <div className="h1">New Travel Request</div>
      <form className="card full" onSubmit={submit} style={{ display: 'grid', gap: 12 }}>
        <label>
          Destination
          <input value={form.destination} onChange={(e) => update('destination', e.target.value)} style={{ width: '100%', padding: 10, border: '1px solid var(--border)', borderRadius: 8 }} />
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <label>
            Start Date
            <input type="date" value={form.startDate} onChange={(e) => update('startDate', e.target.value)} style={{ width: '100%', padding: 10, border: '1px solid var(--border)', borderRadius: 8 }} />
          </label>
          <label>
            End Date
            <input type="date" value={form.endDate} onChange={(e) => update('endDate', e.target.value)} style={{ width: '100%', padding: 10, border: '1px solid var(--border)', borderRadius: 8 }} />
          </label>
        </div>
        <label>
          Purpose
          <textarea value={form.purpose} onChange={(e) => update('purpose', e.target.value)} rows={4} style={{ width: '100%', padding: 10, border: '1px solid var(--border)', borderRadius: 8 }} />
        </label>
        <div>
          <button className="btn" type="submit">Submit</button>
          <button className="btn secondary" type="reset" style={{ marginLeft: 8 }}>Reset</button>
        </div>
      </form>
    </div>
  );
}

