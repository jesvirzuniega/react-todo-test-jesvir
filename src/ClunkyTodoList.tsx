import React, { useCallback, useState, memo } from "react";
import { Task, TaskForm } from "./types";
import CreateTaskForm from "./CreateTaskForm";
import TaskList from "./TaskList";

const initialTasks: Task[] = [
  { id: 1, text: "Learn React", completed: false },
  { id: 2, text: "Write code", completed: true },
  { id: 3, text: "Eat lunch", completed: false },
];

/**
 * Memoize the CreateTaskForm component to avoid unnecessary re-renders.
 * For example, if the user deletes a task, the form will re-render whereas
 * the form only concerns itself with adding a new task.
 */
const MemoizedCreateTaskForm = memo(CreateTaskForm);

/**
 * Bugs:
 * - Filter not working
 * - Vertically and horizontally center the todo list
 * - Count is incorrect
 * Implement features
 * - anchor element delete
 * - clear completed button
 * - add a new filter: only show tasks with 2 or more words
 * Refactor/improvements
 */
export function ClunkyTodoList() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // No need to memoize this, `.length` is not an expensive operation, it's complexity is O(1) constant time.
  const totalCount = tasks.length;

  /**
   * We can utilize useCallback to avoid unnecessary re-render 
   * of this function EXCEPT when the tasks array changes because
   * we use auto increment for the id.
   */
  const handleAddTask = useCallback((newTask: TaskForm) => {
    const taskId = tasks.length + 1;
    const newTasks = [...tasks, { id: taskId, ...newTask }]
    setTasks(newTasks);
  }, [tasks])

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <h2>Items: {totalCount}</h2>
      <MemoizedCreateTaskForm 
        handleAddTask={handleAddTask} 
        style={{ display: 'flex', gap: '8px', marginBottom: '8px' }} 
      />
      <br/>
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
