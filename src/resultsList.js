import React, { Component } from 'react';
import './resultsList.css'

class ResultsList extends Component {

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
        // e.g. https://www.googleapis.com/books/v1/volumes?q=time&printType=magazines&key=yourAPIKey
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


    render() {
      return (
        <div className="ResultsList">
          <h2>This is where the search results will display:</h2>
            <div className="IndividualResults">
                <div className="CoverImagePlaceholder">
                    <p>image placeholder</p>
                </div>
                <div className="BookInfo"> 
                    <h3>Title</h3>
                    <h4>Author Name</h4>
                    <h4>Price</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed scelerisque, ipsum ut finibus maximus, augue justo tincidunt mi.
                    </p>
                </div>
            </div>
          
        </div>
      );
    }
  }
  
  export default ResultsList;