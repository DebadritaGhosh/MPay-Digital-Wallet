import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import routeNames from '../constants/routeNames';
import Layout from '../components/Layout/Layout';

// Lazy-loaded components
const LandingPage = React.lazy(() => import('../pages/LandingPage/LandingPage'));
const LoginPage = React.lazy(() => import('../pages/LoginPage/LoginPage'));
const RegistrationPage = React.lazy(() => import('../pages/RegistrationPage/RegistrationPage'));
const DashboardPage = React.lazy(() => import('../pages/DashboardPage/DashboardPage'));
const ProfilePage = React.lazy(() => import('../pages/ProfilePage/ProfilePage'));
const AuthRoute = React.lazy(() => import('./AuthRoute'));
const ProtectedRoute = React.lazy(() => import('./ProtectedRoute'));

function AppRoute({ token }) {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<Suspense fallback={<div>Loading...</div>}>
						<AuthRoute token={token} />
					</Suspense>
				}
			>
				<Route path="/" element={<LandingPage />} />
				<Route path={routeNames.LOGIN} element={<LoginPage />} />
				<Route path={routeNames.REGISTER} element={<RegistrationPage />} />
			</Route>
			<Route
				element={
					<Suspense fallback={<div>Loading...</div>}>
						<ProtectedRoute token={token} />
					</Suspense>
				}
			>
				<Route
					path={routeNames.DASHBOARD}
					element={
						<Layout>
							<DashboardPage />
						</Layout>
					}
				/>
				<Route path={routeNames.PROFILE} element={<ProfilePage />} />
			</Route>
		</Routes>
	);
}

export default AppRoute;