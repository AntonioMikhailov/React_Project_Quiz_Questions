 import React, { useEffect, useRef, useState } from 'react'
 export default function Flashcard({flashcard}) {
// Рефы нужны для вычисления высоты сторон карточки
  const frontEl = useRef()
  const backEl = useRef()
const [height, setHeight] = useState('initial')
  //  ф. для вычисления высоты карточек - т.к. контент разный и фикс. высота не подойдет, а из за absolute нельзя применить проценты
 //Исключил данную ф. т.к. решил в CSS установить фикс. высоту карточек так выглядит лучше
  function setMathHeight() { 
  const frontHeight =  frontEl.current.getBoundingClientRect().height
   const backHeight =  backEl.current.getBoundingClientRect().height
   // берем максимальное из них
   setHeight(Math.max(frontHeight, backHeight ))   
  }
 
useEffect(()=> {
  setMathHeight()
},[flashcard.answer, flashcard.question, flashcard.options]) // следим
 // также делаем сработку на сжатие экрана + при первой загрузке чтобы высота пересчиталась
 useEffect(()=> {
  window.addEventListener('resize', ()=> { 
    setMathHeight()
  });
})
  // изначально скрываем ответы - answers
  const [flip, setFlip] = useState(false)
   return (
    <>
   {/* По клику тоглим state и показываем разное содержимое через свойство CSS */}
     <div
    //  style={{height: height}} // убрал и поставил в CSS
     className={`card ${flip ? 'flip' : ''}`}
     onClick={()=> setFlip(!flip)}>
      <div className={'front'} ref={frontEl} >
        {flashcard.question}
        <hr />
      <div className="flashcard-options">
        <ul>
        {flashcard.options.map((option, i)=> { 
         return ( 
           <li  key={i}> {option}</li>
          )})  }
          </ul>
      </div>
      </div>
      <div className="back" ref={backEl}>{flashcard.answer}</div>
     </div>
    </>
   )
 }
