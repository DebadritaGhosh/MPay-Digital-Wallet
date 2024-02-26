import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slices/userSlice'

function DashboardPage() {
  const dispatch = useDispatch()
  return (
	<div className='bg-red-900 ml-52'>
    DashboardPage
    <button onClick={() => dispatch(logout())}>Logout</button>
  </div>
  )
}

export default DashboardPage