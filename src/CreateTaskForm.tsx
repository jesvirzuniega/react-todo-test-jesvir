import React, { FormEvent, useRef } from "react";
import { TaskForm } from "./types";

interface CreateTaskFormProps extends React.HTMLAttributes<HTMLFormElement> {
  handleAddTask: (task: TaskForm) => void;
}

export default function CreateTaskForm({ handleAddTask, ...props }: CreateTaskFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  /**
   * Note: I removed the useState hook because it's not necessary.
   * Since all we care about here is the submitted form data,
   * we can use a ref which saves us a lot of re-renders.
   */

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const taskText = (formData.get('text') as string).trim();
    if (taskText === '') return;
    handleAddTask({ text: taskText, completed: false });
    formRef.current?.reset();
  };

  return (
    <form action="" onSubmit={handleSubmit} ref={formRef} {...props}>
      <input type="text" placeholder="Add new task" name="text" required />
      <button type="submit">Add</button>
    </form>
  );
}