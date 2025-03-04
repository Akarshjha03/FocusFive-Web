'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import TaskList from '@/components/TaskList';
import AddTaskModal from '@/components/AddTaskModal';
import { Task } from '@/types/task';

// Import the PomodoroTimer and EfficiencyGraph components
import PomodoroTimer from '@/components/PomodoroTimer';
import EfficiencyGraph from '@/components/EfficiencyGraph';

export default function TasksPage() {
  const [focusFiveTasks, setFocusFiveTasks] = useState<Task[]>([]);
  const [theRestTasks, setTheRestTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      
      // For static export, we need to handle API calls differently
      if (typeof window !== 'undefined') {
        // Client-side: use localStorage
        const storedTasks = localStorage.getItem('focusFiveTasks');
        if (storedTasks) {
          const allTasks = JSON.parse(storedTasks);
          setFocusFiveTasks(allTasks.filter((task: Task) => task.section === 'focusFive' && !task.completed));
          setTheRestTasks(allTasks.filter((task: Task) => task.section === 'theRest' && !task.completed));
        } else {
          setFocusFiveTasks([]);
          setTheRestTasks([]);
        }
      } else {
        // Server-side: use API
        const response = await fetch('/api/tasks');
        const data = await response.json();
        
        if (data.success) {
          setFocusFiveTasks(data.focusFive || []);
          setTheRestTasks(data.theRest || []);
        }
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTask = async (task: Omit<Task, 'id'>) => {
    try {
      // For static export, we need to handle API calls differently
      if (typeof window !== 'undefined') {
        // Client-side: use localStorage
        const storedTasks = localStorage.getItem('focusFiveTasks');
        const allTasks = storedTasks ? JSON.parse(storedTasks) : [];
        
        // Create new task with ID
        const newTask: Task = {
          id: crypto.randomUUID(),
          title: task.title,
          completed: false,
          section: task.section
        };
        
        // Add task to the list
        allTasks.push(newTask);
        
        // Save updated tasks
        localStorage.setItem('focusFiveTasks', JSON.stringify(allTasks));
        
        // Update state
        fetchTasks();
        setIsModalOpen(false);
      } else {
        // Server-side: use API
        const response = await fetch('/api/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(task),
        });

        const data = await response.json();
        
        if (data.success) {
          fetchTasks();
          setIsModalOpen(false);
        }
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleCompleteTask = async (id: string, section: 'focusFive' | 'theRest') => {
    try {
      // For static export, we need to handle API calls differently
      if (typeof window !== 'undefined') {
        // Client-side: use localStorage
        const storedTasks = localStorage.getItem('focusFiveTasks');
        if (!storedTasks) return;
        
        const allTasks = JSON.parse(storedTasks);
        const taskIndex = allTasks.findIndex((task: Task) => task.id === id);
        
        if (taskIndex === -1) return;
        
        const task = allTasks[taskIndex];
        task.completed = true;
        
        // If a FocusFive task is completed, promote a task from TheRest if available
        if (task.section === 'focusFive') {
          const theRestTasks = allTasks.filter(
            (t: Task) => t.section === 'theRest' && !t.completed
          );
          
          if (theRestTasks.length > 0) {
            const taskToPromote = theRestTasks[0];
            taskToPromote.section = 'focusFive';
          }
        }
        
        // Save updated tasks
        localStorage.setItem('focusFiveTasks', JSON.stringify(allTasks));
        
        // Update state
        fetchTasks();
      } else {
        // Server-side: use API
        const response = await fetch(`/api/tasks/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ completed: true }),
        });

        const data = await response.json();
        
        if (data.success) {
          fetchTasks();
        }
      }
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const handleMoveTask = async (id: string, targetSection: 'focusFive' | 'theRest') => {
    try {
      // For static export, we need to handle API calls differently
      if (typeof window !== 'undefined') {
        // Client-side: use localStorage
        const storedTasks = localStorage.getItem('focusFiveTasks');
        if (!storedTasks) return;
        
        const allTasks = JSON.parse(storedTasks);
        const taskIndex = allTasks.findIndex((task: Task) => task.id === id);
        
        if (taskIndex === -1) return;
        
        // Check if moving to FocusFive and if it's full
        if (targetSection === 'focusFive') {
          const focusFiveCount = allTasks.filter(
            (t: Task) => t.section === 'focusFive' && !t.completed
          ).length;
          
          if (focusFiveCount >= 5) {
            alert('FocusFive section is full');
            return;
          }
        }
        
        // Update task section
        allTasks[taskIndex].section = targetSection;
        
        // Save updated tasks
        localStorage.setItem('focusFiveTasks', JSON.stringify(allTasks));
        
        // Update state
        fetchTasks();
      } else {
        // Server-side: use API
        const response = await fetch(`/api/tasks/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ section: targetSection }),
        });

        const data = await response.json();
        
        if (data.success) {
          fetchTasks();
        }
      }
    } catch (error) {
      console.error('Error moving task:', error);
    }
  };

  return (
    <div className="min-h-screen dark-minimal-bg">
      {/* Storm Clouds Background */}
      <div className="storm-clouds"></div>
      <div className="storm-clouds storm-clouds-2"></div>
      <div className="storm-clouds storm-clouds-3"></div>
      
      <main className="min-h-screen p-6 md:p-12 lg:p-24 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Link href="/" className="text-xl">
              <span className="text-white">Focus<span className="text-[rgb(var(--cyan))]">Five</span></span>
            </Link>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="cta-button-left text-sm py-2 px-4"
            >
              + Add Task
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-[rgb(var(--cyan))]">Loading tasks...</p>
            </div>
          ) : (
            <>
              <div className="mb-12">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-[rgb(var(--cyan))]">FocusFive</h2>
                  <span className="text-lg">{focusFiveTasks.length}/5</span>
                </div>
                <div className="dashboard-preview">
                  <TaskList 
                    tasks={focusFiveTasks} 
                    onComplete={handleCompleteTask} 
                    onMove={handleMoveTask}
                    section="focusFive"
                    otherSectionName="TheRest"
                    canMoveToOther={true}
                  />
                </div>
              </div>

              <div className="mb-12">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-[rgb(var(--cyan))]">TheRest</h2>
                  <span className="text-lg">{theRestTasks.length}</span>
                </div>
                <div className="dashboard-preview">
                  <TaskList 
                    tasks={theRestTasks} 
                    onComplete={handleCompleteTask} 
                    onMove={handleMoveTask}
                    section="theRest"
                    otherSectionName="FocusFive"
                    canMoveToOther={focusFiveTasks.length < 5}
                  />
                </div>
              </div>

              {/* Pomodoro Timer and Efficiency Graph */}
              <div className="pomodoro-container">
                <div className="pomodoro-grid">
                  <div className="dashboard-preview">
                    <PomodoroTimer />
                  </div>
                  <div className="dashboard-preview">
                    <EfficiencyGraph 
                      completedTasks={[...focusFiveTasks, ...theRestTasks].filter(task => task.completed).length}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {isModalOpen && (
          <AddTaskModal 
            onClose={() => setIsModalOpen(false)} 
            onAddTask={handleAddTask}
            isFocusFiveFull={focusFiveTasks.length >= 5}
          />
        )}
      </main>
    </div>
  );
}