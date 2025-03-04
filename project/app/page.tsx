import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen dark-minimal-bg">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-4 md:p-6 relative z-10">
        <div className="flex items-center">
          <span className="text-xl font-bold mr-8">
            <span className="text-white">Focus<span className="text-[rgb(var(--neon-blue))]">Five</span></span>
          </span>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="nav-link">Features</a>
            <a href="#" className="nav-link">Pricing</a>
            <a href="#" className="nav-link">Community</a>
            <a href="#" className="nav-link">Download</a>
          </div>
        </div>
        <div className="hidden md:flex space-x-4">
          <a href="#" className="nav-link">Log in</a>
          <a href="#" className="nav-link active">
            <span className="minimal-button">Sign up</span>
          </a>
        </div>
        <button className="md:hidden text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Hero Section */}
      <main className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center p-6 md:p-12 lg:p-24 relative z-10">
        {/* Storm Clouds Background */}
        <div className="storm-clouds"></div>
        <div className="storm-clouds storm-clouds-2"></div>
        <div className="storm-clouds storm-clouds-3"></div>
        
        <div className="w-full max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-start justify-between hero-container">
            {/* Hero Content - Left Aligned */}
            <div className="w-full lg:w-1/2 text-left mb-12 lg:mb-0 hero-content">
              <h1 className="hero-title-left">
                Lightning Fast.<br />
                Laser Focused.
              </h1>
              
              <p className="hero-subtitle-left">
                FocusFive helps you eliminate distractions and achieve more by limiting your attention to just 5 critical tasks.
              </p>
              
              <div className="cta-button-container">
                <Link href="/tasks" className="cta-button-left">
                  Start Focusing Now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
              
              <div className="tech-features-left">
                <span className="tech-feature-item">Eliminate Decision Fatigue</span>
                <span className="tech-feature-item">Maximize Productivity</span>
                <span className="tech-feature-item">Achieve Flow State</span>
              </div>
            </div>
            
            {/* Dashboard Preview */}
            <div className="w-full lg:w-1/2 dashboard-container">
              <div className="dashboard-preview">
                <div className="dashboard-header">
                  <span>FOCUS 5 DASHBOARD</span>
                  <div className="status-indicator">ACTIVE</div>
                </div>
                
                <div className="dashboard-grid">
                  <div className="dashboard-card priority-tasks">
                    <div className="card-header">
                      <span>PRIORITY TASKS</span>
                      <span className="card-count">5</span>
                    </div>
                    <div className="task-list">
                      <div className="dashboard-task">
                        <div className="task-circle"></div>
                        <span>Complete project proposal</span>
                      </div>
                      <div className="dashboard-task">
                        <div className="task-circle"></div>
                        <span>Review client feedback</span>
                      </div>
                      <div className="dashboard-task">
                        <div className="task-circle completed"></div>
                        <span className="completed-text">Update documentation</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="dashboard-card focus-timer">
                    <div className="card-header">
                      <span>FOCUS TIMER</span>
                    </div>
                    <div className="timer-display">
                      <div className="timer-time">25:00</div>
                      <div className="timer-label">POMODORO</div>
                    </div>
                    <div className="timer-controls">
                      <div className="timer-button">START</div>
                      <div className="timer-button">RESET</div>
                    </div>
                  </div>
                  
                  <div className="dashboard-card productivity">
                    <div className="card-header">
                      <span>PRODUCTIVITY</span>
                    </div>
                    <div className="productivity-chart">
                      <div className="chart-bar" style={{height: '60%'}}></div>
                      <div className="chart-bar" style={{height: '80%'}}></div>
                      <div className="chart-bar" style={{height: '40%'}}></div>
                      <div className="chart-bar" style={{height: '90%'}}></div>
                      <div className="chart-bar" style={{height: '70%'}}></div>
                    </div>
                    <div className="productivity-stats">
                      <div className="stat">
                        <div className="stat-value">87%</div>
                        <div className="stat-label">FOCUS RATE</div>
                      </div>
                      <div className="stat">
                        <div className="stat-value">12</div>
                        <div className="stat-label">COMPLETED</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="dashboard-footer">
                  <div className="footer-stat">
                    <div className="stat-dot"></div>
                    <span>FOCUS MODE ACTIVE</span>
                  </div>
                  <div className="footer-stat">
                    <div className="stat-dot yellow"></div>
                    <span>NOTIFICATIONS PAUSED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}