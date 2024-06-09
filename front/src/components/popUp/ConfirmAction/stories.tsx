import type { IConfirmAction } from '.';
import ConfirmAction from '.';

export default {
  title: 'ConfirmAction',
  component: ConfirmAction,
  args: {
    children: 'Storybook',
  },
  argTypes: {
    children: { type: 'string' },
  },
};

export const Template = (args: IConfirmAction) => {
  return (
    <div>
      <ConfirmAction {...args} />
    </div>
  );
};
