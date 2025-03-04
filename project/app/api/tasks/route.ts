import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '@/types/task';
import { getTasks, saveTasks } from '@/lib/taskStore';

export async function GET() {
  try {
    const tasks = await getTasks();
    
    const focusFive = tasks.filter(task => task.section === 'focusFive' && !task.completed);
    const theRest = tasks.filter(task => task.section === 'theRest' && !task.completed);
    
    return NextResponse.json({
      success: true,
      focusFive,
      theRest
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    if (!body.title || typeof body.title !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Title is required and must be a string' },
        { status: 400 }
      );
    }
    
    if (!['focusFive', 'theRest'].includes(body.section)) {
      return NextResponse.json(
        { success: false, error: 'Section must be either "focusFive" or "theRest"' },
        { status: 400 }
      );
    }
    
    const tasks = await getTasks();
    
    // Check if FocusFive is full
    if (body.section === 'focusFive') {
      const focusFiveCount = tasks.filter(
        task => task.section === 'focusFive' && !task.completed
      ).length;
      
      if (focusFiveCount >= 5) {
        return NextResponse.json(
          { success: false, error: 'FocusFive section is full' },
          { status: 400 }
        );
      }
    }
    
    // Create new task
    const newTask: Task = {
      id: uuidv4(),
      title: body.title.trim(),
      completed: false,
      section: body.section
    };
    
    // Add task to the list
    tasks.push(newTask);
    
    // Save updated tasks
    await saveTasks(tasks);
    
    return NextResponse.json({
      success: true,
      task: newTask
    });
  } catch (error) {
    console.error('Error adding task:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add task' },
      { status: 500 }
    );
  }
}