import React, { useEffect, useState } from "react";
import { StatusFilter, Task } from "./types";

interface TaskListProps extends React.HTMLAttributes<HTMLUListElement> {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const initialFilter: StatusFilter = "all";

export default function TaskList({ tasks, setTasks, ...props }: TaskListProps) {
  const [tasksToRender, setTasksToRender] = useState<Task[]>(tasks)
  const [filter, setFilter] = useState<StatusFilter>(initialFilter);
  const [onlyShowTasksWithTwoOrMoreWords, setOnlyShowTasksWithTwoOrMoreWords] = useState(false);

  /**
   * Filter useEffect
   */
  useEffect(() => {
    let filteredTasks = filter === 'all' ? tasks : tasks.filter((task) => task.completed === (filter === 'completed'));
    if (onlyShowTasksWithTwoOrMoreWords) {
      filteredTasks = filteredTasks.filter((task) => task.text.trim().split(' ').length >= 2);
    }
    setTasksToRender(filteredTasks);
  }, [tasks, filter, onlyShowTasksWithTwoOrMoreWords]); // add filter to dependencies
  
  const handleToggleTaskComplete = (id: number) => {
    const updatedTasks = tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task);
    setTasks(updatedTasks);
  }

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <button type="button" onClick={clearCompletedTasks}>Clear Completed Tasks</button>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button type="button" style={filter === 'all' && !onlyShowTasksWithTwoOrMoreWords ? { color: 'green' } : {}} onClick={resetFilter}>All</button>
        <button type="button" style={filter === 'active' ? { color: 'green' } : {}} onClick={() => setFilter("active")}>Active</button>
        <button type="button" style={filter === 'completed' ? { color: 'green' } : {}} onClick={() => setFilter("completed")}>Completed</button>
        <button type="button" style={onlyShowTasksWithTwoOrMoreWords ? { color: 'green' } : {}} onClick={() => setOnlyShowTasksWithTwoOrMoreWords(!onlyShowTasksWithTwoOrMoreWords)}>2+ words only</button>
      </div>
      <ul {...props}>
        {tasksToRender.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTaskComplete(task.id)}
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
  )
}