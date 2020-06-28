import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchForm.css'

class SearchForm extends Component {
    render () {
        return (
            <div className="SearchForm">
                <FontAwesomeIcon icon={faSearch} id="searchIcon"/>
                <input 
                    placeholder="Type here" 
                    value={this.props.searchTerm}
                    onChange={e => this.props.handleUpdate(e.target.value)}
                    />
            </div>
        );
    } 
}

export default SearchForm;