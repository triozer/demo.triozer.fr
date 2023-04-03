import React, { useState, useEffect } from 'react';

const Stopwatch = () => {
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [savedTimes, setSavedTimes] = useState<number[]>([]);

  const start = () => {
    if (isRunning) return;
    setIsRunning(true);
    setIntervalId(setInterval(() => {
      setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
    }, 10));
  };

  const stop = () => {
    if (!isRunning) return;
    setIsRunning(false);
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  const reset = () => {
    stop();
    setElapsedTime(0);
    setSavedTimes([]);
  };

  const formatTime = (time: number): string => {
    const ms = time % 100;
    const s = Math.floor(time / 100);
    return `${s.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
  };

  const save = () => {
    if (elapsedTime === 0) return;
    if (savedTimes.includes(elapsedTime)) return;

    setSavedTimes(prevSavedTimes => [...prevSavedTimes, elapsedTime]);
  };

  useEffect(() => {
    return () => {
      stop();
    };
  }, []);

  return (
    <div className="stopwatch">
      <h1 className="time">{formatTime(elapsedTime)}</h1>
      <div className="buttons">
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
        <button onClick={reset}>Reset</button>
        <button onClick={save}>Save</button>
      </div>
      <div className="saved-times">
        {savedTimes.map(savedTime => (
          <div key={savedTime}>{formatTime(savedTime)}</div>
        ))}
      </div>
    </div>
  );
};

export default Stopwatch;
