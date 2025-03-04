import React from 'react';

interface EfficiencyGraphProps {
  completedTasks: number;
}

const EfficiencyGraph: React.FC<EfficiencyGraphProps> = ({ completedTasks }) => {
  // Mock data for the graph
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Calculate efficiency score based on completed tasks
  const efficiencyScore = Math.min(Math.round((completedTasks / 5) * 100), 100);
  
  // Generate random productivity data for the week
  const generateRandomData = () => {
    return weekdays.map(() => Math.floor(Math.random() * 80) + 20);
  };
  
  const productivityData = generateRandomData();
  
  // Calculate average productivity
  const averageProductivity = Math.round(
    productivityData.reduce((sum, value) => sum + value, 0) / productivityData.length
  );
  
  return (
    <div className="efficiency-graph">
      <div className="graph-header">
        <div className="graph-title">Productivity Trends</div>
        <div className="graph-period">Last 7 Days</div>
      </div>
      
      <div className="graph-container">
        <div className="graph-grid">
          <div className="graph-grid-line"></div>
          <div className="graph-grid-line"></div>
          <div className="graph-grid-line"></div>
          <div className="graph-grid-line"></div>
          <div className="graph-grid-line"></div>
        </div>
        
        <div className="graph-line">
          <div className="graph-line-path"></div>
          <svg className="graph-line-stroke" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path 
              d={`M 0 ${100 - productivityData[0]} 
                  L ${100/7} ${100 - productivityData[1]} 
                  L ${200/7} ${100 - productivityData[2]} 
                  L ${300/7} ${100 - productivityData[3]} 
                  L ${400/7} ${100 - productivityData[4]} 
                  L ${500/7} ${100 - productivityData[5]} 
                  L ${600/7} ${100 - productivityData[6]}`}
              fill="none" 
              stroke="rgb(var(--cyan))" 
              strokeWidth="2"
            />
          </svg>
        </div>
        
        <div className="graph-dots">
          {productivityData.map((value, index) => (
            <div 
              key={index} 
              className="graph-dot" 
              style={{ bottom: `${value}%` }}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="graph-labels">
        {weekdays.map((day, index) => (
          <div key={index} className="graph-label">{day}</div>
        ))}
      </div>
      
      <div className="graph-stats">
        <div className="graph-stat">
          <div className="graph-stat-value">{efficiencyScore}%</div>
          <div className="graph-stat-label">EFFICIENCY</div>
        </div>
        <div className="graph-stat">
          <div className="graph-stat-value">{completedTasks}</div>
          <div className="graph-stat-label">COMPLETED</div>
        </div>
        <div className="graph-stat">
          <div className="graph-stat-value">{averageProductivity}%</div>
          <div className="graph-stat-label">AVG FOCUS</div>
        </div>
      </div>
    </div>
  );
};

export default EfficiencyGraph;