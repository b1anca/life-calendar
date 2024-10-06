import './App.css'

const TOTAL_WEEKS = 90 * 52; // 90 years × 52 weeks (1 year ~= 52 weeks)

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
  const livedWeeks = currentAge * 52;

  return (
    <div className="calendar-grid">
      {Array.from({ length: TOTAL_WEEKS }).map((_, index) => (
        <WeekSquare key={index} isLived={index < livedWeeks} />
      ))}
    </div>
  );
};

function App() {
  const currentAge = 30;

  return (
    <>
      <h1>Life Calendar</h1>
      <LifeCalendar currentAge={currentAge} />
    </>
  )
}

export default App
