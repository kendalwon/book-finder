import React from 'react';
import './BookFinder.css';
import BookCard from './BookCard';
import googleApiKey from './apiKey/apiKey';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

class BookFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      volumes: null
    };
  }

  onFocus = (e) => { 
    e.target.placeholder = '';
  }

  onBlur = (e) => {
    e.target.placeholder = 'Type author, book title, subject...';
  }

  clearForm = () => {
    const searchTerm = '';
    const volumes = null;
    this.setState({ searchTerm, volumes })
  }

  onChange = (e) => {
    const searchTerm = e.target.value;
    this.setState({ searchTerm });
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log('searching');
    this.bookSearch();
  }

  bookSearch = () => {
    const searchTerm = this.state.searchTerm;
    const url = 'https://www.googleapis.com/books/v1/volumes?q=' + searchTerm + '&key=' + googleApiKey + '&country=us';
    fetch(url)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          volumes: json.items
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    console.log(this.state.volumes);
    return (
      <div className='bookFinder'>
        <div className='header'>
          <h1 className='heading'>Book Finder</h1>
        </div>
        <form className='finderForm'
          onSubmit={this.onSubmit}>
          <div className='formDiv'>
            {(this.state.searchTerm !== '') ? (
            <button className='button closeButton'
            type='button'
            onClick={this.clearForm}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            ) : <button className='button emptyButton'
            type='button'>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          }
          <input id='formInput' 
            className='formInput'
            type='text'
            placeholder='Type author, book title, subject...'
            value={this.state.searchTerm}
            onFocus={(e) => this.onFocus(e)}
            onBlur={(e) => this.onBlur(e)}
            onChange={this.onChange.bind(this)}>
          </input>
          <button className='button searchButton'
          type='submit'>
            <FontAwesomeIcon icon={faSearch} />
          </button>
          </div>
        </form>

        {(this.state.volumes) ? (
          <div className='bookCards'>
            {this.state.volumes.map(volume => {
              return (
                <BookCard
                  key={volume.id}
                  title={volume.volumeInfo.title}
                  link={volume.volumeInfo.canonicalVolumeLink}
                  publisher={volume.volumeInfo.publisher}
                  image={volume.volumeInfo.imageLinks === undefined
                    ? "./images/book.jpg"
                    : `${volume.volumeInfo.imageLinks.thumbnail}`}
                  author={volume.volumeInfo.authors}
                  date={volume.volumeInfo.publishedDate}
                />
              )
            })}
          </div>
        ) : null}
      </div>
    );
  }
}

export default BookFinder;
