import React from 'react';
import './BookCard.css';

const BookCard = ({ link, title, image, author, published, date }) => (
  <div className='bookCard'>
    <h1 className='bookTitle'>
      <a className='bookTitle' 
        href={link}
        target='_blank'
        rel='noopener noreferrer'>
          {title}
        </a>
    </h1>
    <div className='infoFlex'>
      <div className='bookImg'>
        <img src={image} alt={title} />
      </div>
      <div className='bookInfo'>
        <h2 className='author'>Author: {author}</h2>
        <h2 className='publisher'>Publisher: {published}</h2>
        <h2 className='date'>Published: {date}</h2>
      </div>
    </div>
  </div>
)

export default BookCard;