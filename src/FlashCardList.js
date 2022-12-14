import React from 'react'
import Flashcard from './Flashcard'
export default function FlashCardList({flashcards}) {
  return (
    <div className='card-grid' >
      {
        flashcards.map((item, i)=> { 
         return ( 
          <div key={i}><Flashcard flashcard={item}/></div>
          )})  
      }
    </div>
  )
}
