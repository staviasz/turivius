import type { IButtonPrimary } from '.';
import ButtonPrimarys from '.';

export default {
  title: 'ButtonPrimarys',
  component: ButtonPrimarys,
  args: {
    children: 'Storybook',
  },
  argTypes: {
    children: { type: 'string' },
  },
};

export const Template = (args: IButtonPrimary) => {
  return (
    <div>
      <ButtonPrimarys {...args} />
    </div>
  );
};
