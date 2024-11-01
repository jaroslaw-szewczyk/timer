import { useState, useEffect } from 'react';
import Button from './components/Button/Button';
import styles from './styles/App.module.scss';
import './styles/global.scss';

function App() {
  const [millisecond, setMillisecond] = useState(0);
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  
  const startInterval = () => {
    if (!isRunning) {
      const id = setInterval(() => {
        setMillisecond(prevMillisecond => {
          const newMillisecond = prevMillisecond + 1;
          if (newMillisecond === 100) {
            setSecond(prevSecond => {
              const newSecond = prevSecond + 1;
              if (newSecond === 60) {
                setMinute(prevMinute => {
                  const newMinute = prevMinute + 1;
                  if (newMinute === 60) {
                    setHour(prevHour => prevHour + 1);
                    return 0;
                  }
                  return newMinute;
                });
                return 0;
              }
              return newSecond;
            });
            return 0;
          }
          return newMillisecond;
        });
      }, 10);

      setIntervalId(id);
      setIsRunning(true);
    }    
  };

  const stopInterval = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setIsRunning(false);
    setIntervalId(null);
  };

  const resetInterval = () => {
    stopInterval();
    setMillisecond(0);
    setSecond(0);
    setMinute(0);
    setHour(0);
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);
  
  return (
    <div className={styles.app_container}>
      <div className={styles.counter}>
        {hour}:{minute < 10 ? `0${minute}` : minute}:
        {second < 10 ? `0${second}` : second}.
        {millisecond < 10 ? `0${millisecond}` : millisecond}
      </div>
      <Button onClick={startInterval}>Start</Button>
      <Button onClick={stopInterval}>Stop</Button>
      <Button onClick={resetInterval}>Reset</Button>
    </div>
  );
}

export default App;