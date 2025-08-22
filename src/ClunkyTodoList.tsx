import React, { useEffect, useMemo, useState } from "react";

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
  const [tasks, setTasks] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Write code", completed: true },
    { id: 3, text: "Eat lunch", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const tempTasks = [...tasks];
      tempTasks.push({ id: Date.now(), text: newTask, completed: false });
      setTasks(tempTasks);
      setNewTask("");
    }
  };

  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        let tempTask = { id: task.id, text: task.text, completed: task.completed };
        tempTask.completed = !tempTask.completed;
        return tempTask;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const [tasksToRender, setTasksToRender] = useState<any[]>([])
  useEffect(() => {
    if (filter === 'all') return setTasksToRender(tasks); // Since there are no other filters, return early if all is selected. No need to filter.
    const filteredTasks = tasks.filter((task) => task.completed === (filter === 'completed'));
    setTasksToRender(filteredTasks);
  }, [tasks, filter]); // add filter to dependencies

  // No need to memoize this, `.length` is not an expensive operation, it's complexity is O(1) constant time.
  const totalCount = tasks.length;

  const handleDeleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const clearCompletedTasks = () => {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <h2>Items: {totalCount}</h2>
      <button type="button" onClick={clearCompletedTasks}>Clear Completed Tasks</button>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Add new task"
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>
      <ul>
        {tasksToRender.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(task.id)}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>
            <a style={{ margin: '0 8px', cursor: 'pointer' }} onClick={() => handleDeleteTask(task.id)}>[x]</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
