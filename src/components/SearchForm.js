import React from 'react'
import axios from 'axios'

import SearchResults from './SearchResults'
import SearchBar from './SearchForm/SearchBar'

class SearchForm extends React.Component {
	constructor(props) {
		super(props)
		this.ACCESS_TOKEN = process.env.REACT_APP_LOCATION_ACCESS_TOKEN
		this.state = { searchQuery: '' }
	}

	changeSearchQuery = e => {
		this.setState({ searchQuery: e.target.value, results: '' })
	}

	// update results passed to searchResults
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
				this.updateResults(res.data)
				this.state.error ? this.setState({ error: '' }) : console.log()
			})
			.catch(error => {
				let errorCodes = [400, 404, 500]
				console.log(error)
				if (errorCodes.includes(error.response.status)) {
					this.setState({
						error: 'Unable to geocode. Check spelling or try another location.',
					})
				} else {
					// check for other code errors
				}
			})
	}

	render() {
		return (
			<>
				<SearchBar
					handleSubmit={this.handleSubmit}
					changeSearchQuery={this.changeSearchQuery}
					error={this.state.error}
					minorError={this.state.minorError}
				/>

				{this.state.results ? (
					<>
						<h3> Explore locations matching: {this.props.searchQuery}</h3>
						<SearchResults
							results={this.state.results}
							searchQuery={this.state.searchQuery}
						/>
					</>
				) : (
					''
				)}
			</>
		)
	}
}

export default SearchForm
