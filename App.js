import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [birthday, setBirthday] = useState('');
  const [daysLeft, setDaysLeft] = useState(null);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateCountdown = () => {
    const birthdayDate = new Date(birthday);
    const today = new Date();
    const diffTime = birthdayDate - today;
    const diffSeconds = Math.ceil(diffTime / 1000);

    let seconds = diffSeconds;
    const days = Math.floor(seconds / (3600 * 24));
    seconds -= days * 3600 * 24;
    const hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    setCountdown({
      days,
      hours,
      minutes,
      seconds,
    });
  }

  useEffect(() => {
    if (daysLeft) {
      const intervalId = setInterval(() => {
        calculateCountdown();
      }, 1000);

      return () => {
        clearInterval(intervalId);
      }
    }
  }, [daysLeft]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const birthdayDate = new Date(birthday);
    const today = new Date();
    const diffTime = birthdayDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysLeft(diffDays);
  }

  return (
    <div className="App">
      <h1>Birthday Countdown</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your birthday:
          <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
        </label>
        <button type="submit">Calculate</button>
      </form>
      {daysLeft && (
        <div>
          <p>Countdown to your birthday:</p>
          <div className="countdown">
            <div>
              <p>{countdown.days}</p>
              <span>Days</span>
            </div>
            <div>
              <p>{countdown.hours}</p>
              <span>Hours</span>
            </div>
            <div>
              <p>{countdown.minutes}</p>
              <span>Minutes</span>
            </div>
            <div>
              <p>{countdown.seconds}</p>
              <span>Seconds</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
