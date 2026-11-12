import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
//import Crossword from './components/crossWord';
import { useState } from 'react';


function App() {
  const [index, setIndex] = useState(0);
  const [letterChar, setLetter] = useState('');
  const letterVal = document.querySelectorAll('.letter-value');
  const letterInput = document.querySelectorAll('.letter-input');
  const rumbleLetter = document.querySelectorAll('.rumble-letter');
  const wordPuzzle = ["GRIPO", "SARANGGOLA", "KANDILA", "ILAW", "ZIPPER", "ANINO"];
  const letterPuzz = ["AGRXVOIIHE", "SXZRNJJAGL", "KJLINUA", "VIUOA", "TSZPREQP", "OBALUKI"];
  const description = [
    "Nahihilo si Lolo, Nasusuka si Lola",
    "Hilain Pababa, Lalong Tumataas",
    "Kung kailan mo pinatay, saka pa humaba ang buhay",
    "Isang butil ng palay, sakop lahat ng bahay",
    "Dumaan ang hari, nagkagatan ang mga pari",
    "Ako ay may kaibigan, kasama ko kahit saan"
  ];

  //HANDLELETTER FUNCTION THAT RECEIVES THE CLICKED BUTTON LETTER
  const handleLetter = (event) => {
    const inputElement = event.target;
    inputElement.value = letterChar; // Set the focused input's value
    setLetter("")
  };

  //PUTLETTER FUNCTION THAT DETERMINE THE CURRENT VALUE OF LETTER
  const putLetter = (event, letter) => {
    const inputElement = event.target;
    setLetter(letter)

    inputElement.style.visibility = "hidden";
  };

  //RESET ALL THE CHANGES
  const handleReset = () => {
    letterInput.forEach((el) => {
      el.value = "";
    });

    rumbleLetter.forEach((el) => {
      el.style.visibility = "visible";
    });
  };

  //SUBMIT THE ANSWER
  const submitAnswer = (event, no) => {
    event.preventDefault();

    const letterArray = [...letterVal];
    const valuesOfLetter = [];

    letterArray.forEach((el) => {
      let letterVal = el.value;

      valuesOfLetter.push(letterVal)
    });

    let joinLetter = valuesOfLetter.join('');

    //CHECK IF BOTH THE INPUTTED WORD AND CORRECT ANSWER IS EQUAL

    if (joinLetter === wordPuzzle[index]) {
      no++;
      setIndex(no); //PROCEED TO THE NEXT QUESTION
    } else {
      alert("Wrong!");
    };

    handleReset();
    setLetter();
  }

  const tryAgain = (event) => {
    event.preventDefault();

    setIndex(0);
  }


  return (
    <div className="App">
      <header className='main-header'>
        <h1>BUGTO<span className='span-yellow'>NG</span></h1>
      </header>

      <div className='main-container'>
        <div className='cross-container'>
          <h3>{index < description.length ? description[index] : "THANK YOU FOR ANSWERING MY BUGTONG!"}</h3>

          <form className="cross-box" onSubmit={(e) => submitAnswer(e, index)}>
            {
              index < description.length
                ?
                wordPuzzle[index].split('').map((letter, indx) =>
                  <div key={indx} className='letter-box'>
                    {
                      indx % 2 === 0
                        ?
                        <input type="input" className='letter-input letter-value' onFocus={handleLetter} readOnly />
                        :
                        <input value={letter} className='letter-value default-letter' readOnly />
                    }
                  </div>
                )
                :
                <div className='letter-box'></div>
            }

            <br />

            {
              index < description.length
                ?
                letterPuzz[index].split('').map((letter, indx) =>
                  <button type="button" key={indx} className='rumble-letter' value={letter} onClick={(e) => putLetter(e, letter)}>{letter}</button>
                )
                :
                <button type="button" className="try-again" onClick={tryAgain}>TRY AGAIN?</button>
            }

            <br />

            {
              index < description.length
                ?
                <button type='button' className='reset-btn'><FontAwesomeIcon icon={faArrowsRotate} onClick={handleReset} /></button>
                :
                <div></div>
            }

            <br />

            {
              index < description.length
                ?
                <button type="submit" className='submit-btn'>Submit</button>
                :
                <div></div>
            }
          </form>
        </div>
      </div>

    </div>
  );
}

export default App;
/* 
 if(joinLetter == wordPuzzle[index]) {
      no++;
      setIndex(no); //PROCEED TO THE NEXT QUESTION
    }else { 
      alert("Wrong!");
    };


            {
              wordPuzzle[index].split('').map((letter, indx) => 
                <div key={indx} className='letter-box'>
                  {
                  indx % 2 === 0 
                  ? 
                  <input type="input" className='letter-input letter-value' onFocus={handleLetter} readOnly/>
                  : 
                  <input value={letter} className='letter-value default-letter' readOnly/>
                  }
                </div>
              )
            }
*/