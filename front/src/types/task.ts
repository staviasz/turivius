import type { Category } from './category';

export interface Task {
  id: number;
  title: string;
  executeDate: Date;
  execute_date?: Date;
  category: Category;
  completed: boolean;
  description: string;
}
