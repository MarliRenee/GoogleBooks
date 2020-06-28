import React, { Component } from 'react';
import './App.css';
import ResultsList from './resultsList'
import Search from './Search'

class App extends Component {

  handleSearchSubmit = ( searchSubmitEvent, searchInput ) => {
    searchSubmitEvent.preventDefault();
    this.setState({
      searchQuery: searchInput
    });
    const baseUrl = 'https://www.googleapis.com/books/v1/volumes'
    const key = 'AIzaSyChEVyXj63zQlYyMVKGG-ahkqk0B812RrQ';
    const formattedSearchUrl = this.formatQuery( baseUrl, searchInput, key );
    fetch( formattedSearchUrl )
      .then(response => {
        if(!response.ok) {
          throw new Error('Something went wrong on the network. Please try again later.');
        }
        return response;
      })
      .then(response => response.json())
      .then(bookResultsObj => {
        console.log('Good response From Google Books API: ', bookResultsObj)
        this.setState({
          bookResults: bookResultsObj,
          error: null
        });
      })
      .catch(error => {
        this.setState({
          error: error.message
        });
      });
}

formatQuery = ( baseUrl, searchInput, key ) => {
    const { bookFilter, printFilter } = this.state;
    let formattedQuery;
    if ( searchInput !== '') {
      formattedQuery = '?q=' + searchInput; 
    }
    if ( bookFilter !== '') {
      formattedQuery = formattedQuery + '&filter=' + bookFilter;
    }
    if ( printFilter !== '') {
      formattedQuery = formattedQuery + '&bookType=' + printFilter;
    }
    const formattedUrl  = baseUrl + formattedQuery + '&key=' + key; 
    console.log('formatted URL: ', formattedUrl);   
    return formattedUrl;    
}

  render () {
    return (
      <div className="App">
        <header>
          <h1>Google Books API Search</h1>
        </header>
          <Search />
          <ResultsList />
      </div>
    );
  }
}

export default App;
