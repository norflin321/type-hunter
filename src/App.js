import React, { useEffect, useReducer, useRef } from 'react';
import lifeIcon from './heart.png';
import { reducer } from './reducer';
import Word from './components/Word';

const starsSpeed = { animation: 'animStar 80s linear infinite' };

const initialState = {
  words: [],
  inputValue: '',
  lifes: 0,
  score: 0,
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const speedRef = useRef(null);
  speedRef.current = 2000 - state.score / 10;

  useEffect(() => {
    const addWord = () => {
      dispatch({
        type: 'addWord',
      });
      setTimeout(addWord, speedRef.current);
    };
    addWord();
  }, []);

  return (
    <>
      {state.lifes > 0 ? (
        <>
          <div className="lifes">
            <span>Lifes:</span>
            {Array.from({ length: state.lifes }, (_, index) => (
              <img key={index} src={lifeIcon} alt="heart" className="life-icon" />
            ))}
          </div>
          <div className="score">Score: {state.score}</div>
          {state.words.map((el, index) => (
            <Word key={index} value={el} dispatch={dispatch} score={state.score} />
          ))}
          <div style={starsSpeed} id="stars" />
          <div className="input-group">
            <input autoFocus value={state.inputValue} onChange={e => dispatch({ type: 'killWord', payload: e.target.value.trim() })} type="input" className="input" id="name" autoComplete="off" />
          </div>
        </>
      ) : (
        <div className="start-new-game">
          {state.score > 0 && <div>Score: {state.score}</div>}
          <span onClick={e => dispatch({ type: 'startNewGame', payload: initialState })}>start new game</span>
        </div>
      )}
    </>
  );
};
export default App;
