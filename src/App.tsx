import { useEffect, useState } from 'react';
import './App.css';

const WEEKS_IN_YEAR = 52;
const DEFAULT_MAX_AGE = 90;
const DEFAULT_BIRTH_DATE = '1990-01-01'

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

const LifeCalendar: React.FC<{ livedWeeks: number; maxAge: number }> = ({ livedWeeks, maxAge }) => {
  const totalWeeks = maxAge * WEEKS_IN_YEAR;

  return (
    <div className="calendar-grid">
      {Array.from({ length: totalWeeks }).map((_, index) => (
        <WeekSquare key={index} index={index} isLived={index < livedWeeks} />
      ))}
    </div>
  );
};

const calculateLivedWeeks = (birthDate: Date): number => {
  const currentDate = new Date();
  const yearsLived = currentDate.getFullYear() - birthDate.getFullYear();
  const totalWeeksBeforeThisYear = yearsLived * WEEKS_IN_YEAR;
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
  const weeksThisYear = Math.floor((currentDate.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24 * 7));
  const birthDayThisYear = new Date(currentDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  const isBirthdayPassedThisYear = currentDate >= birthDayThisYear;
  const totalLivedWeeks = totalWeeksBeforeThisYear + (isBirthdayPassedThisYear ? weeksThisYear : weeksThisYear - WEEKS_IN_YEAR);

  return totalLivedWeeks;
};

function App() {
  const [birthDate, setBirthDate] = useState<string>(DEFAULT_BIRTH_DATE);
  const [maxAge, setMaxAge] = useState<number>(DEFAULT_MAX_AGE);
  const [livedWeeks, setLivedWeeks] = useState<number>(0);


  useEffect(() => {
    const storedBirthDate = localStorage.getItem('birthDate');
    const storedMaxAge = localStorage.getItem('maxAge');

    if (storedBirthDate) {
      setBirthDate(storedBirthDate);
      setLivedWeeks(calculateLivedWeeks(new Date(storedBirthDate)));
    }

    if (storedMaxAge) {
      setMaxAge(parseInt(storedMaxAge, 10));
    }
  }, []);

  const handleBirthDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBirthDate = event.target.value;
    setBirthDate(newBirthDate);
    const newLivedWeeks = calculateLivedWeeks(new Date(newBirthDate));
    setLivedWeeks(newLivedWeeks);
    localStorage.setItem('birthDate', newBirthDate);
  };

  const handleMaxAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxAge = parseInt(event.target.value, 10);
    if (!isNaN(newMaxAge) && newMaxAge >= 0) {
      setMaxAge(newMaxAge);
      localStorage.setItem('maxAge', newMaxAge.toString());
    }
  };

  return (
    <>
      <h1>Life Calendar</h1>
      <div className="flex">
        <div className="mr-2">
          <label htmlFor="birthDateInput">Your birthdate: </label>
          <input
            id="birthDateInput"
            type="date"
            value={birthDate}
            onChange={handleBirthDateChange}
          />
        </div>
        <div>
          <label htmlFor="maxAgeInput">Max age: </label>
          <input
            id="maxAgeInput"
            type="number"
            value={maxAge}
            onChange={handleMaxAgeChange}
            min={0}
            max={150}
          />
        </div>
      </div>
      <LifeCalendar livedWeeks={livedWeeks} maxAge={maxAge} />
    </>
  );
}

export default App;
