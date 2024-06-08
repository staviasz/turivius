'use client';

import type { Task } from '@/types/task';
import type { TypeTask } from '@/types/typeTasks';
import { createContext } from 'react';

interface ITaskContext {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  selectedTask: Task | null;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
  formIsOpen: boolean;
  setFormIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTypeTask: TypeTask | null;
  setSelectedTypeTask: React.Dispatch<React.SetStateAction<TypeTask['type'] | null>>;
  selectedActionForm: 'create' | 'update' | 'delete' | null;
  setActionForm: React.Dispatch<React.SetStateAction<'create' | 'update' | 'delete' | null>>;
  executeServiceTask: () => Promise<void>;
}

export const TaskContext = createContext<ITaskContext>({} as ITaskContext);
TaskContext.displayName = 'task context';
