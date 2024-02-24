import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slices/userSlice'

function DashboardPage() {
  const dispatch = useDispatch()
  return (
	<div>
    DashboardPage
    <button onClick={() => dispatch(logout())}>Logout</button>
  </div>
  )
}

export default DashboardPage