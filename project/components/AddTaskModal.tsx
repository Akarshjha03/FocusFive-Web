import React, { useState } from 'react';
import { Task } from '@/types/task';

interface AddTaskModalProps {
  onClose: () => void;
  onAddTask: (task: Omit<Task, 'id'>) => void;
  isFocusFiveFull: boolean;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ 
  onClose, 
  onAddTask,
  isFocusFiveFull
}) => {
  const [title, setTitle] = useState('');
  const [section, setSection] = useState<'focusFive' | 'theRest'>(isFocusFiveFull ? 'theRest' : 'focusFive');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    onAddTask({
      title: title.trim(),
      completed: false,
      section
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="text-xl font-bold neon-blue">Add New Task</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="task-title">Task Title</label>
            <input
              id="task-title"
              type="text"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Add to Section</label>
            <div className="form-radio-group">
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="section"
                  value="focusFive"
                  checked={section === 'focusFive'}
                  onChange={() => setSection('focusFive')}
                  disabled={isFocusFiveFull}
                />
                <span>FocusFive {isFocusFiveFull && '(Full)'}</span>
              </label>
              
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="section"
                  value="theRest"
                  checked={section === 'theRest'}
                  onChange={() => setSection('theRest')}
                />
                <span>TheRest</span>
              </label>
            </div>
          </div>
          
          <button type="submit" className="neon-button form-submit">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;