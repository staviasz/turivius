import type { IButtonSecondary } from '.';
import ButtonSecondary from '.';

export default {
  title: 'ButtonSecondary',
  component: ButtonSecondary,
  args: {
    children: 'Storybook',
  },
  argTypes: {
    children: { type: 'string' },
  },
};

export const Template = (args: IButtonSecondary) => {
  return (
    <div>
      <ButtonSecondary {...args} />
    </div>
  );
};
