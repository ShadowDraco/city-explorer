import React from 'react'
import axios from 'axios'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SearchResults from './SearchResults'

class SearchForm extends React.Component {
	constructor(props) {
		super(props)
		this.ACCESS_TOKEN = process.env.REACT_APP_LOCATION_ACCESS_TOKEN
		this.state = { searchQuery: '' }
	}

	changeSearchQuery = e => {
		this.setState({ searchQuery: e.target.value, results: '' })
	}

	updateResults = data => {
		this.setState({ results: data })
	}

	handleSubmit = e => {
		e.preventDefault()

		axios
			.get(
				`https://us1.locationiq.com/v1/search?key=${this.ACCESS_TOKEN}&q=${this.state.searchQuery}&format=json`
			)
			.then(res => {
				console.log(res.data)
				this.updateResults(res.data)
			})
	}

	render() {
		return (
			<>
				<Form
					className='search-form my-3 py-3 border border-primary border-3'
					onSubmit={this.handleSubmit}
				>
					<Form.Group
						className='mb-3 search-form-group'
						controlId='formBasicEmail'
					>
						<Form.Label>Find a location!</Form.Label>
						<Form.Control
							onChange={this.changeSearchQuery}
							type='text'
							placeholder='Seattle'
						/>
						<Form.Text className='text-muted'>Try a city perhaps!</Form.Text>
					</Form.Group>

					<Button variant='primary' type='submit'>
						Explore!
					</Button>
				</Form>

				<SearchResults results={this.state.results ? this.state.results : ''} />
			</>
		)
	}
}

export default SearchForm
