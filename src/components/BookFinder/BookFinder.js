import React, { useState } from 'react';
import BookCard from '../BookCard/BookCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import googleApiKey from '../../apiKey/apiKey';
import './BookFinder.css';

const BookFinder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [volumes, setVolumes] = useState(null);

  const onFocus = (e) => e.target.placeholder = '';

  const onBlur = (e) => e.target.placeholder = 'Type author, book title, subject...';

  const clearForm = () => {
    setSearchTerm('');
    setVolumes(null);
  }  

  const onChange = (e) => setSearchTerm(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    bookSearch();
  }

  const bookSearch = () => {
    const url = 'https://www.googleapis.com/books/v1/volumes?q=' + searchTerm + '&key=' + googleApiKey + '&country=us';
    fetch(url)
      .then(response => response.json())
      .then(json => {
        setVolumes(json.items);
      })
      .catch(error => console.log(error));
  }

  return (
    <div className='bookFinder'>
      <div className='header'>
        <h1 className='heading'>Book Finder</h1>
      </div>
      <form className='finderForm'
        onSubmit={onSubmit}>
        <div className='formDiv'>
          {(searchTerm !== '') ? (
          <button className='button closeButton'
          type='button'
          onClick={clearForm}>
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
          value={searchTerm}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}>
        </input>
        <button className='button searchButton'
        type='submit'>
          <FontAwesomeIcon icon={faSearch} />
        </button>
        </div>
      </form>

      {(volumes !== null) ? (
        <div className='bookCards'>
          {volumes.map(volume => {
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

export default BookFinder;
