import React from 'react'

// Importing utils
import { capitalizeFirstLetter } from '../../utils/utils'

function Input(props) {
	const { InputHandler, name, ...otherProps } = props;

	return (
		<div className="w-full">
			<label htmlFor={name} className="block text-gray-800 mt-5">
				{capitalizeFirstLetter(name)}
			</label>
			<input
				name={name}
				id={name}
				className="w-full border border-gray-300 h-10 rounded-sm px-4 py-2 mt-1 focus:outline-none focus:border-gray-500"
				{...otherProps}
				{...InputHandler}
				required
			/>
		</div>

	)
}

export default Input