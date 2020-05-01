// import wordsLibrary from './wordsLibrary';
import randomWords from 'random-words';

export const reducer = (state, action) => {
  const { type, payload } = action;

  if (state.lifes > 0) {
    if (type === 'addWord') {
      return {
        ...state,
        words: [...state.words, randomWords()],
      };
    }

    if (type === 'killWord') {
      const index = state.words.indexOf(payload);
      if (index > -1) {
        return {
          ...state,
          words: [...state.words.slice(0, index), '', ...state.words.slice(index + 1)],
          inputValue: '',
          score: state.score + payload.length * 10,
        };
      }
      return {
        ...state,
        inputValue: payload,
      };
    }

    if (type === 'missWord') {
      const index = state.words.indexOf(payload);
      if (index > -1) {
        return {
          ...state,
          words: [...state.words.slice(0, index), '', ...state.words.slice(index + 1)],
          lifes: state.lifes - 1,
        };
      }
      return state;
    }
  }

  if (type === 'startNewGame') {
    return {
      ...payload,
      lifes: 5,
    };
  }

  return state;
};
