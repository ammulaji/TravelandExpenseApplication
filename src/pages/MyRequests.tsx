export default function MyRequests() {
  return (
    <div>
      <div className="h1">My Requests</div>
      <div className="card full">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Destination / Category</th>
              <th>Status</th>
              <th>Submitted</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="muted">Travel</td>
              <td className="muted">—</td>
              <td className="muted">—</td>
              <td className="muted">—</td>
            </tr>
            <tr>
              <td className="muted">Expense</td>
              <td className="muted">—</td>
              <td className="muted">—</td>
              <td className="muted">—</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

