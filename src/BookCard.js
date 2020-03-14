import React from 'react';
import './BookCard.css';

const BookCard = props => {
  return (
    <div className='bookCard'>
      <h1 className='bookTitle'>
        <a className='bookTitle' 
          href={props.link}
          target='_blank'
          rel='noopener noreferrer'>
            {props.title}
          </a>
      </h1>
      <div className='infoFlex'>
        <div className='bookImg'>
          <img src={props.image} alt={props.title} />
        </div>
        <div className='bookInfo'>
          <h2 className='author'>Author: {props.author}</h2>
          <h2 className='publisher'>Publisher: {props.published}</h2>
          <h2 className='date'>Published: {props.date}</h2>
        </div>
      </div>
    </div>
  )
}

export default BookCard;