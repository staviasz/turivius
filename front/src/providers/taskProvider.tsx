'use client';

import { TaskContext } from '@/contexts/TaskContext';
import type { Task } from '@/types/task';
import { useState } from 'react';

interface ITaskProvider {
  children: React.ReactNode;
}

export const TaskProvider: React.FC<ITaskProvider> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [formIsOpen, setFormIsOpen] = useState<boolean>(false);
  const [selectedActionForm, setActionForm] = useState<'create' | 'update' | 'delete' | null>(null);
  const [confirmAction, setConfirmAction] = useState<boolean>(false);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        selectedTask,
        setSelectedTask,
        formIsOpen,
        setFormIsOpen,
        setActionForm,
        confirmAction,
        setConfirmAction,
        selectedActionForm,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
