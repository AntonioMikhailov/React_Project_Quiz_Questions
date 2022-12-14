import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import FlashCardList from "./FlashCardList";
function App() {
    const [flashcards, setFlashcards] = useState([])
const categoryEl = useRef()
const amountEl = useRef()
 const [categories, setCategories] = useState([])
useEffect(()=> {
  axios.get('https://opentdb.com/api_category.php')
  .then(res => setCategories(res.data.trivia_categories))
},[])
  // ф. декодирования БД чтобы удалить символы HTML из текста ( типа :"&quot;)
function decodeString(str) { 
  // поместим весь текст из БД в textarea  и вернем оттуда текст без символов HTML
  const textArea = document.createElement('textarea')
  textArea.innerHTML = str;
  return textArea.value
  }
 function handleSubmit(e) { 
    e.preventDefault()
   axios.get('https://opentdb.com/api.php', {
      params : {
        amount: amountEl.current.value,
        category: categoryEl.current.value
      }
    })
.then(res => {
  setFlashcards(
   res.data.results.map((questionItem, index)=> { 
      const answer = decodeString(questionItem.correct_answer)
      // в массив с Неправ. ответами добавляем Правильный и перемешиваем
    const options = [...questionItem.incorrect_answers.map(a => decodeString(a) ),answer ]
     return ( 
        {  id: `${index}-${Date.now()}`,
        // вставляем ф. decodeString которая очистит текст от символов HTML 
          question: decodeString(questionItem.question),
          answer:answer,  
          // рандомную сортировку делаем
          options: options.sort(()=> Math.random() - .5)
        }
      )
    })
 )}) }
  return (
  <>
  <div className="header-title">Выберите категорию и количество вопросов. Для получения ответа нажмите на карточку вопроса.</div>
  <form  className={'header'} onSubmit={handleSubmit} >
<div className="form-group">
  <label htmlFor="category">Категория</label>
  <select  ref={categoryEl}>
    {
      categories.map((item, i)=> { 
       return ( 
        <option key={i} value={item.id}>{item.name}</option>
        )})  
    }
   </select>
</div>
<div className="form-group">
<label  htmlFor="category">Количество вопросов</label>
<input data-questions type="number" id='amount' step='1' min='1' defaultValue={12} ref={amountEl}  />
</div>
<div className="form-group">
  <button className={'btn'} >Получить</button>
</div>
  </form>
    <div className="container">
    <FlashCardList
   flashcards={flashcards}/>
    </div>
  </>
  );
}
export default App;
