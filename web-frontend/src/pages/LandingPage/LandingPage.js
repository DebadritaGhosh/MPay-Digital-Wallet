import React from 'react'
import { useNavigate } from 'react-router-dom';
import routeNames from '../../constants/routeNames';

function LandingPage() {
	const navigate = useNavigate();

  return (
	<div>
		LandingPage
		<button onClick={() => navigate(routeNames.LOGIN)}>Login</button>
		<button onClick={() => navigate(routeNames.REGISTER)}>Register</button>
		<h1>test{process.env.REACT_APP_BASE_URL}</h1>
		</div>
  )
}

export default LandingPage