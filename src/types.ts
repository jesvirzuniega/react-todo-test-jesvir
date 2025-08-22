export type Task = {
  id: number;
  text: string;
  completed: boolean;
}

export type TaskForm = Omit<Task, 'id'>;

export type StatusFilter = 'all' | 'active' | 'completed';
