import { useState, useEffect } from 'react';
import './NotHome.css';

const NotHome = () => {
  const [counter, setCounter] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Reset counter if it goes below 0
    if (counter < 0) {
      setCounter(0);
    }
    
    // Show message if counter is greater than 5
    setShowMessage(counter > 5);
  }, [counter]);

  const increaseCounter = () => {
    setCounter(counter + 1);
  };

  const decreaseCounter = () => {
    setCounter(counter - 1);
  };

  return (
    <div className="not-home-container">
      <h2>Not Home Page</h2>
      <div className="counter-container">
        <h3>Counter: {counter}</h3>
        <div className="counter-bar" style={{ width: `${counter * 30}px` }}></div>
        <div className="counter-buttons">
          <button onClick={increaseCounter}>Increase</button>
          <button onClick={decreaseCounter}>Decrease</button>
        </div>
        {showMessage && <p className="counter-message">You passed 5!</p>}
      </div>
    </div>
  );
};

export default NotHome;