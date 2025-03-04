import React, { useState, useEffect } from 'react';

const PomodoroTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'pomodoro' | 'shortBreak' | 'longBreak'>('pomodoro');
  
  const modes = {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
  };
  
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Play notification sound or show notification
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);
  
  const toggleTimer = () => {
    setIsActive(!isActive);
  };
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(modes[mode]);
  };
  
  const changeMode = (newMode: 'pomodoro' | 'shortBreak' | 'longBreak') => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(modes[newMode]);
  };
  
  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Calculate progress percentage
  const progressPercentage = (timeLeft / modes[mode]) * 100;
  
  return (
    <div className="pomodoro-timer">
      <div className="card-header">
        <span>FOCUS TIMER</span>
      </div>
      
      <div className="pomodoro-display">
        <div 
          className="pomodoro-progress"
          style={{ 
            background: `conic-gradient(
              rgb(var(--cyan)) 0%,
              rgba(var(--cyan), 0.5) ${progressPercentage}%,
              transparent ${progressPercentage}%
            )` 
          }}
        ></div>
        <div className="pomodoro-time">{formatTime(timeLeft)}</div>
        <div className="pomodoro-label">{mode.toUpperCase()}</div>
      </div>
      
      <div className="pomodoro-controls">
        <button className="pomodoro-button" onClick={toggleTimer}>
          {isActive ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
              Pause
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              Start
            </>
          )}
        </button>
        
        <button className="pomodoro-button" onClick={resetTimer}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 2v6h6"></path>
            <path d="M21 12A9 9 0 0 0 6 5.3L3 8"></path>
            <path d="M21 22v-6h-6"></path>
            <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"></path>
          </svg>
          Reset
        </button>
      </div>
      
      <div className="pomodoro-settings">
        <button 
          className={`pomodoro-setting ${mode === 'pomodoro' ? 'active' : ''}`}
          onClick={() => changeMode('pomodoro')}
        >
          Pomodoro
        </button>
        <button 
          className={`pomodoro-setting ${mode === 'shortBreak' ? 'active' : ''}`}
          onClick={() => changeMode('shortBreak')}
        >
          Short Break
        </button>
        <button 
          className={`pomodoro-setting ${mode === 'longBreak' ? 'active' : ''}`}
          onClick={() => changeMode('longBreak')}
        >
          Long Break
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;