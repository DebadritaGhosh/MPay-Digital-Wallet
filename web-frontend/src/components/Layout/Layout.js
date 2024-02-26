// Importing libraries
import React from 'react'

// Importing components
import Sidebar from '../Sidebar/Sidebar'

function Layout({ children }) {
	return (
		<main className="flex">
			<Sidebar />
			<section className="flex-1 bg-cyan-500">
				{children}
			</section>
		</main>
	)
}

export default Layout