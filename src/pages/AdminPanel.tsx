export default function AdminPanel() {
  return (
    <div>
      <div className="h1">Admin Panel</div>
      <div className="grid">
        <div className="card">
          <div className="card-title">Users</div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="muted">—</td>
                <td className="muted">—</td>
                <td className="muted">—</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card">
          <div className="card-title">Policies</div>
          <ul>
            <li className="muted">Travel limits, categories, approvals…</li>
          </ul>
        </div>
        <div className="card full">
          <div className="card-title">Audit Log</div>
          <table>
            <thead>
              <tr>
                <th>When</th>
                <th>Actor</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="muted">—</td>
                <td className="muted">—</td>
                <td className="muted">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

