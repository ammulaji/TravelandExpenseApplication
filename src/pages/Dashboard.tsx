import { Link } from 'react-router-dom';
import { useRole } from '../auth/roles';

function Card({ title, children, full = false }: { title: string; children: React.ReactNode; full?: boolean; }) {
  return (
    <div className={`card ${full ? 'full' : ''}`}>
      <div className="card-title">{title}</div>
      {children}
    </div>
  );
}

export default function Dashboard() {
  const { role } = useRole();
  return (
    <div>
      <div className="h1">Dashboard</div>
      <div className="toolbar">
        <Link to="/new-travel" className="btn">New Travel Request</Link>
        <Link to="/new-expense" className="btn">New Expense</Link>
      </div>
      <div className="grid">
        <Card title="My Requests">
          <table>
            <thead>
              <tr><th>Destination</th><th>Status</th><th>Start Date</th></tr>
            </thead>
            <tbody>
              <tr><td className="muted">—</td><td className="muted">—</td><td className="muted">—</td></tr>
              <tr><td className="muted">—</td><td className="muted">—</td><td className="muted">—</td></tr>
            </tbody>
          </table>
        </Card>
        <Card title="Approval Requests">
          {role === 'user' ? (
            <div className="muted">No approval permissions</div>
          ) : (
            <table>
              <thead>
                <tr><th>Employee</th><th>Destination</th><th>Start Date</th></tr>
              </thead>
              <tbody>
                <tr><td className="muted">—</td><td className="muted">—</td><td className="muted">—</td></tr>
                <tr><td className="muted">—</td><td className="muted">—</td><td className="muted">—</td></tr>
              </tbody>
            </table>
          )}
        </Card>

        <Card title="Admin Panel" full>
          {role === 'admin' ? (
            <div className="muted">Admin insights and settings appear here.</div>
          ) : (
            <div className="muted">Admin only</div>
          )}
        </Card>
      </div>
    </div>
  );
}

