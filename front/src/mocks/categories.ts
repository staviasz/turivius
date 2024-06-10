import { Category } from '@/types/category';

export const categories: { [key in Category]: string } = {
  [Category.home]: 'Casa',
  [Category.leisure]: 'Lazer',
  [Category.food]: 'Alimentação',
  [Category.personal]: 'Pessoal',
  [Category.work]: 'Trabalho',
  [Category.study]: 'Estudo',
};
