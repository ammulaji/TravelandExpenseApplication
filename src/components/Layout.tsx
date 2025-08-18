import { NavLink } from 'react-router-dom';
import { useRole } from '../auth/roles';
import RoleSwitcher from './RoleSwitcher';

export default function Layout({ children }: { children: React.ReactNode }) {
	const { role } = useRole();
	return (
		<div className="app-shell">
			<aside className="sidebar">
				<div className="title">Travel & Expense<br/>Management</div>
				<nav className="nav">
					<NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
					<NavLink to="/new-travel" className={({ isActive }) => isActive ? 'active' : ''}>New Travel Request</NavLink>
					<NavLink to="/new-expense" className={({ isActive }) => isActive ? 'active' : ''}>Submit Expense</NavLink>
					<NavLink to="/my-requests" className={({ isActive }) => isActive ? 'active' : ''}>My Requests</NavLink>
					{(role === 'approver' || role === 'admin') && (
						<NavLink to="/approvals" className={({ isActive }) => isActive ? 'active' : ''}>Approvals</NavLink>
					)}
					{role === 'admin' && (
						<NavLink to="/admin" className={({ isActive }) => isActive ? 'active' : ''}>Admin Panel</NavLink>
					)}
				</nav>
			</aside>
			<section className="content">
				<header className="topbar">
					<div style={{fontWeight:800}}>Dashboard</div>
					<input className="search" placeholder="Search" />
					<div className="spacer" />
					<RoleSwitcher />
				</header>
				<main className="page">{children}</main>
			</section>
		</div>
	);
}

