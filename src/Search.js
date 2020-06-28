import React, { Component } from 'react';
import './Search.css'
import SearchForm from './SearchForm'

class Search extends Component {
    render() {
        return (
            <div className="Search">
                 <h2>This is the search Div</h2>
                 <SearchForm />
                 <h3>[these will be the filter options]</h3>
            </div>
        );
    }
}

export default Search