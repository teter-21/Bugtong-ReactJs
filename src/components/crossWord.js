import React from 'react';
import { useState } from 'react';

function crossWord() {
    const wordPuzzle = ["GRIPO", "SARANGGOLA", "Computer"];
    const letterPuzz = ["AGRXVOIIHE"]
    const randomInt = Math.floor(Math.random() * (80 - 1 + 1)) + 1;
    let letterVal = document.querySelectorAll('.letter-value');
    const [alpha, setLetter] = useState('');

    const submitAnswer = (event) => {
      event.preventDefault();
      alert()
    /*  const newArr = [];
      const arr = [...letterVal]

      arr.forEach((el) => {
        let val = el.getAttribute('value');

        newArr.push(val)
      })

      let jois = newArr.join('')

      alert(jois); */
    }

    return (
      <div className='main-container'>
        <div className='cross-container'>
          <h3>Nahihilo si Lolo, Nasusuka si Lola</h3>

          <form className="cross-box" onSubmit={submitAnswer}>
            {
              wordPuzzle[0].split('').map((letter, index) => 
                <div key={index} className='letter-box'>{index % 2 === 0 ? <input type="text" className='letter-input letter-value'></input> : <div value={letter} className='letter-input letter-value'>{letter}</div>}</div>
              )
            }
            <br></br><br></br>
            {
              letterPuzz[0].split('').map((letter, index) => 
                <button type="button" key={index} className='rumble-letter' value={letter} onClick={(e) => setLetter(e.target.value)}>{letter}</button>
              )
            }
            <br></br><br></br>
            <button type="submit" className='submit-btn'>Submit</button>
          </form>
        </div>
      </div>
    );
}

export default crossWord;