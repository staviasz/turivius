import type { ITitle } from '.';
import Title from '.';

export default {
  title: 'Title',
  component: Title,
  args: {
    children: 'Storybook',
  },
  argTypes: {
    children: { type: 'string' },
  },
};

export const Template = (args: ITitle) => {
  return (
    <div>
      <Title {...args}>StoryBok</Title>
    </div>
  );
};
