import React, { useEffect, useRef } from 'react';

const keyframes = [{ transform: 'translate3D(0, 0, 0)' }, { transform: `translate3D(-${window.innerWidth + 250}px, 0, 0)` }];
const options = {
  duration: 30000,
  iterations: 1,
};

const Word = ({ value, dispatch, score }) => {
  const wordRef = useRef(null);
  const animationRef = useRef(null);
  const valueRef = useRef(value);
  const startingPosition = useRef({ top: Math.floor(Math.random() * (window.innerHeight - 40 - 150) + 150), right: -300 });

  useEffect(() => {
    animationRef.current = wordRef.current.animate(keyframes, options);
    animationRef.current.onfinish = () => {
      dispatch({ type: 'missWord', payload: valueRef.current });
    };
    return () => animationRef.current.cancel();
  }, [dispatch]);

  useEffect(() => {
    if (value === '') {
      animationRef.current.cancel();
    }
  }, [value]);

  return (
    <div ref={wordRef} className="word" style={startingPosition.current}>
      {value}
    </div>
  );
};

export default Word;
