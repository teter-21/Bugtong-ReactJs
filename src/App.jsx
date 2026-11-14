import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

// The original hard-coded questions and letter banks are deliberately preserved.
const wordPuzzle = [
  "GRIPO",
  "SARANGGOLA",
  "KANDILA",
  "ILAW",
  "ZIPPER",
  "ANINO",
];
const letterPuzz = [
  "AGRXVOIIHE",
  "SXZRNJJAGL",
  "KJLINUA",
  "VIUOA",
  "TSZPREQP",
  "OBALUKI",
];
const description = [
  "Nahihilo si Lolo, Nasusuka si Lola",
  "Hilain Pababa, Lalong Tumataas",
  "Kung kailan mo pinatay, saka pa humaba ang buhay",
  "Isang butil ng palay, sakop lahat ng bahay",
  "Dumaan ang hari, nagkagatan ang mga pari",
  "Ako ay may kaibigan, kasama ko kahit saan",
];

function App() {
  const [index, setIndex] = useState(0);
  // Each answer slot stores the selected letter AND its bank position.
  // Tracking positions lets us handle duplicate letters without losing a tile.
  const [placedLetters, setPlacedLetters] = useState({});
  const [feedback, setFeedback] = useState("");
  const finished = index >= wordPuzzle.length;
  const answer = finished ? "" : wordPuzzle[index];
  const usedTiles = new Set(
    Object.values(placedLetters).map(({ tileIndex }) => tileIndex),
  );

  const putLetter = (letter, tileIndex) => {
    if (usedTiles.has(tileIndex) || finished) return;
    // Fill the first empty slot (the pre-filled letters stay unchanged).
    const firstEmpty = answer
      .split("")
      .findIndex((_, i) => i % 2 === 0 && !placedLetters[i]);
    if (firstEmpty === -1) return;
    setPlacedLetters((prev) => ({
      ...prev,
      [firstEmpty]: { letter, tileIndex },
    }));
    setFeedback("");
  };

  // Tap a filled slot to return its letter to the bank.
  const removeLetter = (slotIndex) => {
    setPlacedLetters((prev) => {
      const updated = { ...prev };
      delete updated[slotIndex];
      return updated;
    });
    setFeedback("");
  };

  const handleReset = () => {
    setPlacedLetters({});
    setFeedback("");
  };

  const submitAnswer = (event) => {
    event.preventDefault();
    if (finished) return;
    const entered = answer
      .split("")
      .map((letter, i) =>
        i % 2 === 0 ? placedLetters[i]?.letter || "" : letter,
      )
      .join("");
    if (answer.split("").some((_, i) => i % 2 === 0 && !placedLetters[i])) {
      setFeedback("Punan muna ang lahat ng bakanteng kahon.");
      return;
    }
    if (entered === answer) {
      setIndex((prev) => prev + 1);
      setPlacedLetters({});
      setFeedback("");
    } else {
      setFeedback("Hindi pa tama. Subukan ulit!");
    }
  };

  const tryAgain = () => {
    setIndex(0);
    handleReset();
  };

  return (
    <div className="App">
      <header className="main-header">
        <h1>
          BUGTO<span className="span-yellow">NG</span>
        </h1>
        <p className="subtitle">Hulaan ang mga bugtong!</p>
      </header>

      <main className="main-container">
        <section className="cross-container" aria-label="Bugtong game">
          {!finished ? (
            <>
              <div className="progress-row">
                <span>
                  Bugtong {index + 1} sa {description.length}
                </span>
                <span>
                  {Math.round((index / description.length) * 100)}% completed
                </span>
              </div>
              <div
                className="progress-track"
                role="progressbar"
                aria-valuenow={index}
                aria-valuemin={0}
                aria-valuemax={description.length}
                aria-label="Game progress"
              >
                <div
                  className="progress-fill"
                  style={{ width: `${(index / description.length) * 100}%` }}
                />
              </div>
              <h2 className="riddle">{description[index]}</h2>
              <p className="instructions">
                Pumili ng letra sa ibaba. I-tap ang kahon para alisin ang letra.
              </p>
              <form className="cross-box" onSubmit={submitAnswer}>
                <div className="answer-row" aria-label="Your answer">
                  {answer.split("").map((letter, slotIndex) => (
                    <div key={slotIndex} className="letter-box">
                      {slotIndex % 2 === 0 ? (
                        <button
                          type="button"
                          className="letter-value letter-input"
                          onClick={() => removeLetter(slotIndex)}
                          disabled={!placedLetters[slotIndex]}
                          aria-label={`Letter ${slotIndex + 1}: ${placedLetters[slotIndex]?.letter || "empty"}`}
                          title={
                            placedLetters[slotIndex]
                              ? "Remove this letter"
                              : "Choose a letter below"
                          }
                        >
                          {placedLetters[slotIndex]?.letter || "\u00a0"}
                        </button>
                      ) : (
                        <span
                          className="letter-value default-letter"
                          aria-label={`Hint letter ${letter}`}
                        >
                          {letter}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="letter-bank" aria-label="Available letters">
                  {letterPuzz[index].split("").map((letter, tileIndex) => (
                    <button
                      type="button"
                      key={tileIndex}
                      className="rumble-letter"
                      onClick={() => putLetter(letter, tileIndex)}
                      disabled={usedTiles.has(tileIndex)}
                      aria-label={`Choose letter ${letter}`}
                    >
                      {letter}
                    </button>
                  ))}
                </div>
                <p className="feedback" role="status" aria-live="polite">
                  {feedback || "\u00a0"}
                </p>
                <div className="actions">
                  <button
                    type="button"
                    className="reset-btn"
                    onClick={handleReset}
                    aria-label="Reset answer"
                  >
                    <FontAwesomeIcon icon={faArrowsRotate} /> <span>Reset</span>
                  </button>
                  <button type="submit" className="submit-btn">
                    Submit Answer
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="finished-panel">
              <div className="finish-icon" aria-hidden="true">
                ★
              </div>
              <h2>THANK YOU FOR ANSWERING MY BUGTONG!</h2>
              <p>
                Mahusay! Nasagutan mo ang lahat ng {description.length} bugtong.
              </p>
              <button type="button" className="try-again" onClick={tryAgain}>
                TRY AGAIN?
              </button>
            </div>
          )}
        </section>
      </main>
      <footer className="game-footer">
        Bugtong-Bugtong · Filipino Riddle Game
      </footer>
    </div>
  );
}

export default App;
