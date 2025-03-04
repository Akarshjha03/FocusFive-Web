import { Task } from '@/types/task';

// In-memory storage for tasks when in production
let tasksCache: Task[] = [];

// Get all tasks
export async function getTasks(): Promise<Task[]> {
  // In production, use the in-memory cache
  if (process.env.NODE_ENV === 'production') {
    return tasksCache;
  }
  
  // In development, use file-based storage
  try {
    const fs = require('fs/promises');
    const path = require('path');
    const DB_PATH = path.join(process.cwd(), 'data', 'tasks.json');
    
    // Ensure the data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    try {
      await fs.access(dataDir);
    } catch (error) {
      await fs.mkdir(dataDir, { recursive: true });
    }
    
    try {
      const data = await fs.readFile(DB_PATH, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      // If file doesn't exist or is invalid, return empty array
      return [];
    }
  } catch (error) {
    console.error('Error reading tasks:', error);
    return [];
  }
}

// Save tasks
export async function saveTasks(tasks: Task[]): Promise<void> {
  // In production, update the in-memory cache
  if (process.env.NODE_ENV === 'production') {
    tasksCache = [...tasks];
    return;
  }
  
  // In development, use file-based storage
  try {
    const fs = require('fs/promises');
    const path = require('path');
    const DB_PATH = path.join(process.cwd(), 'data', 'tasks.json');
    
    // Ensure the data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    try {
      await fs.access(dataDir);
    } catch (error) {
      await fs.mkdir(dataDir, { recursive: true });
    }
    
    await fs.writeFile(DB_PATH, JSON.stringify(tasks, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving tasks:', error);
    throw new Error('Failed to save tasks');
  }
}