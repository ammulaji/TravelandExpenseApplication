import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import NewTravel from './pages/NewTravel';
import NewExpense from './pages/NewExpense';
import MyRequests from './pages/MyRequests';
import Approvals from './pages/Approvals';
import AdminPanel from './pages/AdminPanel';
import { RoleProvider, useRole } from './auth/roles';

function ProtectedRoute({ children, allow }: { children: JSX.Element; allow: Array<string>; }) {
	const { role } = useRole();
	if (!allow.includes(role)) {
		return <Navigate to="/" replace />;
	}
	return children;
}

export default function App() {
	return (
		<RoleProvider>
			<Layout>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/new-travel" element={<NewTravel />} />
					<Route path="/new-expense" element={<NewExpense />} />
					<Route path="/my-requests" element={<MyRequests />} />
					<Route path="/approvals" element={
						<ProtectedRoute allow={["approver", "admin"]}>
							<Approvals />
						</ProtectedRoute>
					} />
					<Route path="/admin" element={
						<ProtectedRoute allow={["admin"]}>
							<AdminPanel />
						</ProtectedRoute>
					} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</Layout>
		</RoleProvider>
	);
}

