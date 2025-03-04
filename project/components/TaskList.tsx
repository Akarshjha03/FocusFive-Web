import React from 'react';
import { Task } from '@/types/task';

interface TaskListProps {
  tasks: Task[];
  onComplete: (id: string, section: 'focusFive' | 'theRest') => void;
  onMove: (id: string, targetSection: 'focusFive' | 'theRest') => void;
  section: 'focusFive' | 'theRest';
  otherSectionName: string;
  canMoveToOther: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onComplete, 
  onMove, 
  section, 
  otherSectionName,
  canMoveToOther
}) => {
  if (tasks.length === 0) {
    return (
      <div className="bg-gray-900 bg-opacity-30 rounded-lg p-6 text-center">
        <p className="text-gray-400">No tasks in this section</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 bg-opacity-30 rounded-lg p-4">
      {tasks.map((task) => (
        <div key={task.id} className="task-item">
          <div 
            className={`task-circle ${task.completed ? 'completed' : ''}`}
            onClick={() => onComplete(task.id, section)}
          ></div>
          <span className={task.completed ? 'line-through text-gray-500' : ''}>
            {task.title}
          </span>
          <div className="task-actions">
            {section === 'focusFive' && (
              <button
                onClick={() => onMove(task.id, 'theRest')}
                className="text-sm px-2 py-1 bg-gray-800 rounded hover:bg-gray-700"
                title={`Move to ${otherSectionName}`}
              >
                ↓
              </button>
            )}
            {section === 'theRest' && canMoveToOther && (
              <button
                onClick={() => onMove(task.id, 'focusFive')}
                className="text-sm px-2 py-1 bg-gray-800 rounded hover:bg-gray-700"
                title={`Move to ${otherSectionName}`}
              >
                ↑
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;