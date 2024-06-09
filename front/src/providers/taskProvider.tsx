'use client';

import { TaskContext } from '@/contexts/TaskContext';
import type { Task } from '@/types/task';
import { useEffect, useState } from 'react';

interface ITaskProvider {
  children: React.ReactNode;
}

export const TaskProvider: React.FC<ITaskProvider> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [formIsOpen, setFormIsOpen] = useState<boolean>(false);
  const [selectedActionForm, setActionForm] = useState<'create' | 'update' | 'delete' | null>(null);
  const [executeServiceTask, setExecuteServiceTask] = useState<() => Promise<void>>(() =>
    Promise.resolve(),
  );

  useEffect(() => {
    switch (selectedActionForm) {
      case 'create':
        setExecuteServiceTask(() => {
          return () => {
            return Promise.resolve();
          };
        });
        break;
      case 'update':
        setExecuteServiceTask(() => {
          return () => {
            return Promise.resolve();
          };
        });
        break;
      case 'delete':
        setExecuteServiceTask(() => {
          return () => {
            return Promise.resolve();
          };
        });
        break;
    }
  }, [selectedActionForm]);

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
        executeServiceTask,
        selectedActionForm,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
