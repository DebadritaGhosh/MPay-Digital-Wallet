// Importing libraries
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importing pages
import AuthRoute from './AuthRoute';
import ProtectedRoute from './ProtectedRoute';

// Importing pages
import LandingPage from '../pages/LandingPage/LandingPage';
import LoginPage from "../pages/LoginPage/LoginPage";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import DashboardPage from "../pages/DashboardPage/DashboardPage";

// Importing constants
import routeNames from '../constants/routeNames';



function AppRoute({ token }) {

	return (
		<Routes>
			<Route element={<AuthRoute token={token} />}>
				<Route path="/" element={<LandingPage />} />
				<Route path={routeNames.LOGIN} element={<LoginPage />} />
				<Route path={routeNames.REGISTER} element={<RegistrationPage />} />
			</Route>
			<Route element={<ProtectedRoute token={token} />}>
				<Route path={routeNames.DASHBOARD} element={<DashboardPage />} />
			</Route>
		</Routes >
	)
}

export default AppRoute;