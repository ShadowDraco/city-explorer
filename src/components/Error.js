import React from 'react'

export default class Error extends React.Component {
	constructor(props) {
		super(props)
		console.log()
	}

	render() {
		return (
			<h5 className='text-danger text-center'>{this.props.errorMessage}</h5>
		)
	}
}
