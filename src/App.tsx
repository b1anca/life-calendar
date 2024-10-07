import { useEffect, useState } from 'react';
import './App.css'

const MIN_AGE = 0;
const WEEKS_IN_YEAR = 52;
const DEFAULT_AGE = 30;
const DEFAULT_MAX_AGE = 90;

interface WeekSquareProps {
  isLived: boolean;
  index: number;
}

const WeekSquare: React.FC<WeekSquareProps> = ({ isLived, index }) => {
  const weekAge = Math.floor(index / WEEKS_IN_YEAR);
  const weekNumber = index % WEEKS_IN_YEAR + 1;

  return (
    <div
      className={`week-square ${isLived ? 'lived' : ''}`}
      title={`age: ${weekAge}, week: ${weekNumber}`}
    ></div>
  );
};

const LifeCalendar: React.FC<{ currentAge: number; maxAge: number }> = ({ currentAge, maxAge }) => {
  const totalWeeks = maxAge * WEEKS_IN_YEAR;
  const livedWeeks = currentAge * WEEKS_IN_YEAR;

  return (
    <div className="calendar-grid">
      {Array.from({ length: totalWeeks }).map((_, index) => (
        <WeekSquare key={index} index={index} isLived={index < livedWeeks} />
      ))}
    </div>
  );
};

function App() {
  const [currentAge, setCurrentAge] = useState(DEFAULT_AGE);
  const [maxAge, setMaxAge] = useState(DEFAULT_MAX_AGE);

  useEffect(() => {
    const storedAge = localStorage.getItem('currentAge');
    const storedMaxAge = localStorage.getItem('maxAge');

    if (storedAge) {
      setCurrentAge(parseInt(storedAge, 10));
    }
    if (storedMaxAge) {
      setMaxAge(parseInt(storedMaxAge, 10));
    }
  }, []);

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAge = parseInt(event.target.value, 10);
    if (!isNaN(newAge) && newAge >= MIN_AGE && newAge <= maxAge) {
      setCurrentAge(newAge);
      localStorage.setItem('currentAge', newAge.toString());
    }
  };

  const handleMaxAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxAge = parseInt(event.target.value, 10);
    if (!isNaN(newMaxAge) && newMaxAge >= MIN_AGE) {
      setMaxAge(newMaxAge);
      localStorage.setItem('maxAge', newMaxAge.toString());

      if (currentAge > newMaxAge) {
        setCurrentAge(newMaxAge);
        localStorage.setItem('currentAge', newMaxAge.toString());
      }
    }
  };

  return (
    <>
      <h1>Life Calendar</h1>
      <div className="flex">
        <div className="mr-2">
          <label htmlFor="ageInput">Your age: </label>
          <input
            id="ageInput"
            type="number"
            value={currentAge}
            onChange={handleAgeChange}
            min={MIN_AGE}
            max={maxAge}
          />
        </div>
        <div>
          <label htmlFor="maxAgeInput">Max age: </label>
          <input
            id="maxAgeInput"
            type="number"
            value={maxAge}
            onChange={handleMaxAgeChange}
            min={MIN_AGE}
            max={150}
          />
        </div>
      </div>
      <LifeCalendar currentAge={currentAge} maxAge={maxAge} />
    </>
  );
}

export default App;
