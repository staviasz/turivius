import { Category } from '@/types/category';
import type { Task } from '@/types/task';

export const tasks: Task[] = [
  {
    id: 1,
    title: 'Tarefa 1',
    completed: true,
    category: Category.home,
    executeDate: new Date(),
    description: 'a'.repeat(256),
  },
  {
    id: 2,
    title: 'Tarefa 2',
    completed: false,
    category: Category.study,
    executeDate: new Date(),
    description: 'teste',
  },
  {
    id: 3,
    title: 'Tarefa 3',
    completed: false,
    category: Category.work,
    executeDate: new Date(),
    description: 'teste',
  },
  {
    id: 4,
    title: 'Tarefa 4',
    completed: false,
    category: Category.leisure,
    executeDate: new Date(),
    description: 'teste',
  },
  {
    id: 5,
    title: 'Tarefa 5',
    completed: false,
    category: Category.food,
    executeDate: new Date(),
    description: 'teste',
  },
];
