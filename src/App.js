import { useState, useEffect } from 'react';
import Button from './components/Button/Button'

function App() {

  const [number, setNumber] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  
  const startInterval = () => {

    if(!isRunning){
      const id = setInterval(() => {
        setNumber(prevNumber => prevNumber + 1);
      }, 1000)
      setIntervalId(id);
      setIsRunning(true);
    }    
  };

  const stopInterval = () => {
    if(intervalId) {
      clearInterval(intervalId);
    }
    setIsRunning(false);
    setIntervalId(null);
  };

  const resetInterval = () => {
    stopInterval();
    setNumber(0);
  };

  useEffect(() => {
    return () => {
        if (intervalId) {
            clearInterval(intervalId);
        }
    };
}, [intervalId]);
  
  return (
    <div>
      {number}
      <Button onClick={startInterval}>Start</Button>
      <Button onClick={stopInterval}>Stop</Button>
      <Button onClick={resetInterval}>Reset</Button>
    </div>
  );
}


export default App;
