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
  const [onlyShowTasksWithTwoOrMoreWords, setOnlyShowTasksWithTwoOrMoreWords] = useState(false);

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
    let filteredTasks = filter === 'all' ? tasks : tasks.filter((task) => task.completed === (filter === 'completed'));
    if (onlyShowTasksWithTwoOrMoreWords) {
      filteredTasks = filteredTasks.filter((task) => task.text.trim().split(' ').length >= 2);
    }
    setTasksToRender(filteredTasks);
  }, [tasks, filter, onlyShowTasksWithTwoOrMoreWords]); // add filter to dependencies

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

  /**
   * Since we added a new filter that works alongside active/completed,
   * It doesn't make sense for user to click `all` and 2+ words filter is still active.
   * So let's reset all filters when user clicks `all` button.
   */
  const resetFilter = () => {
    setFilter("all");
    setOnlyShowTasksWithTwoOrMoreWords(false);
  }

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
        <button type="button" style={filter === 'all' && !onlyShowTasksWithTwoOrMoreWords ? { color: 'green' } : {}} onClick={resetFilter}>All</button>
        <button type="button" style={filter === 'active' ? { color: 'green' } : {}} onClick={() => setFilter("active")}>Active</button>
        <button type="button" style={filter === 'completed' ? { color: 'green' } : {}} onClick={() => setFilter("completed")}>Completed</button>
        <button type="button" style={onlyShowTasksWithTwoOrMoreWords ? { color: 'green' } : {}} onClick={() => setOnlyShowTasksWithTwoOrMoreWords(!onlyShowTasksWithTwoOrMoreWords)}>2+ words only</button>
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
