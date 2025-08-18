export default function Approvals() {
  return (
    <div>
      <div className="h1">Approvals</div>
      <div className="grid">
        <div className="card">
          <div className="card-title">Travel Requests</div>
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Destination</th>
                <th>Dates</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="muted">—</td>
                <td className="muted">—</td>
                <td className="muted">—</td>
                <td>
                  <button className="btn" disabled>Approve</button>
                  <button className="btn secondary" disabled style={{ marginLeft: 8 }}>Reject</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-title">Expense Claims</div>
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Amount</th>
                <th>Category</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="muted">—</td>
                <td className="muted">—</td>
                <td className="muted">—</td>
                <td>
                  <button className="btn" disabled>Approve</button>
                  <button className="btn secondary" disabled style={{ marginLeft: 8 }}>Reject</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

