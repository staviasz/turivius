import type { Category } from './category';

export interface Task {
  id: number;
  title: string;
  executeDate: Date;
  category: Category;
  completed: boolean;
  description: string;
}
