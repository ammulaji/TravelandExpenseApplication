import { useRole, Role } from '../auth/roles';

const ROLES: Array<Role> = ['user', 'approver', 'admin'];

export default function RoleSwitcher() {
  const { role, setRole } = useRole();
  return (
    <div className="spaced" style={{ gap: 8 }}>
      <span className="pill" title="Current role">{role}</span>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as Role)}
        style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid var(--border)' }}
        aria-label="Switch role"
      >
        {ROLES.map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>
    </div>
  );
}

