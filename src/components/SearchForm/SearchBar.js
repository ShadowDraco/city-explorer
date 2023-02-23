import React from 'react'

import MinorError from '../MinorError'
import Error from '../Error'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default class SearchBar extends React.Component {
	constructor(props) {
		super(props)
		console.log()
	}

	render() {
		return (
			<Form
				className='search-form my-3 py-3 border border-primary border-3'
				onSubmit={this.props.handleSubmit}
			>
				<Form.Group
					className='mb-3 search-form-group'
					controlId='formBasicEmail'
				>
					<Form.Label>Find a location!</Form.Label>
					<Form.Control
						onChange={this.props.changeSearchQuery}
						type='text'
						placeholder='Seattle'
					/>
					<Form.Text className='text-muted'>
						{this.props.error ? (
							<MinorError errorMessage={'Error - !'} />
						) : (
							'Try a city perhaps!'
						)}
					</Form.Text>
				</Form.Group>

				{this.props.error ? <Error errorMessage={this.props.error} /> : ''}

				<Button variant='primary' type='submit'>
					Explore!
				</Button>
			</Form>
		)
	}
}
