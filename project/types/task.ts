export interface Task {
  id: string;
  title: string;
  completed: boolean;
  section: 'focusFive' | 'theRest';
}