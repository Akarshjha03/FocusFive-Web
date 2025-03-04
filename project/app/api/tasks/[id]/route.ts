import { NextRequest, NextResponse } from 'next/server';
import { getTasks, saveTasks } from '@/lib/taskStore';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    
    const tasks = await getTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }
    
    const task = tasks[taskIndex];
    
    // Handle task completion
    if (body.completed !== undefined) {
      task.completed = Boolean(body.completed);
      
      // If a FocusFive task is completed, promote a task from TheRest if available
      if (task.completed && task.section === 'focusFive') {
        const theRestTasks = tasks.filter(
          t => t.section === 'theRest' && !t.completed
        );
        
        if (theRestTasks.length > 0) {
          const taskToPromote = theRestTasks[0];
          taskToPromote.section = 'focusFive';
        }
      }
    }
    
    // Handle moving task between sections
    if (body.section !== undefined && ['focusFive', 'theRest'].includes(body.section)) {
      // Check if moving to FocusFive and if it's full
      if (body.section === 'focusFive' && task.section !== 'focusFive') {
        const focusFiveCount = tasks.filter(
          t => t.section === 'focusFive' && !t.completed
        ).length;
        
        if (focusFiveCount >= 5) {
          return NextResponse.json(
            { success: false, error: 'FocusFive section is full' },
            { status: 400 }
          );
        }
      }
      
      task.section = body.section;
    }
    
    // Update task in the list
    tasks[taskIndex] = task;
    
    // Save updated tasks
    await saveTasks(tasks);
    
    return NextResponse.json({
      success: true,
      task
    });
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    const tasks = await getTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }
    
    // Remove task from the list
    tasks.splice(taskIndex, 1);
    
    // Save updated tasks
    await saveTasks(tasks);
    
    return NextResponse.json({
      success: true
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}