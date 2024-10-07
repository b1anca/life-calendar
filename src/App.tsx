import { useEffect, useState } from 'react';
import './App.css'

const MIN_AGE = 0;
const MAX_AGE = 90;
const WEEKS_IN_YEAR = 52;
const TOTAL_WEEKS = MAX_AGE * WEEKS_IN_YEAR;
const DEFAULT_AGE = 30;

interface WeekSquareProps {
  isLived: boolean;
}

const WeekSquare: React.FC<WeekSquareProps> = ({ isLived }) => {
  return (
    <div
      className={`week-square ${isLived ? 'lived' : ''}`}
      title={isLived ? 'Lived' : 'Future'}
    ></div>
  );
};

const LifeCalendar: React.FC<{ currentAge: number }> = ({ currentAge }) => {
  const livedWeeks = currentAge * WEEKS_IN_YEAR;

  return (
    <div className="calendar-grid">
      {Array.from({ length: TOTAL_WEEKS }).map((_, index) => (
        <WeekSquare key={index} isLived={index < livedWeeks} />
      ))}
    </div>
  );
};

function App() {
  const [currentAge, setCurrentAge] = useState(DEFAULT_AGE);

  useEffect(() => {
    const storedAge = localStorage.getItem('currentAge');
    if (storedAge) {
      setCurrentAge(parseInt(storedAge, 10));
    }
  }, []);

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAge = parseInt(event.target.value, 10);
    if (!isNaN(newAge) && newAge >= MIN_AGE && newAge <= MAX_AGE) {
      setCurrentAge(newAge);
      localStorage.setItem('currentAge', newAge.toString());
    }
  };

  console.log('debug app')
  return (
    <>
      <h1>Life Calendar</h1>
      <div>
        <label htmlFor="ageInput">Enter your age: </label>
        <input
          id="ageInput"
          type="number"
          value={currentAge}
          onChange={handleAgeChange}
          min={MIN_AGE}
          max={MAX_AGE}
        />
      </div>
      <LifeCalendar currentAge={currentAge} />
    </>
  )
}

export default App
