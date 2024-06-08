import type { IInput } from '.';
import Input from '.';

export default {
  title: 'Input',
  component: Input,
  args: {
    id: 'input',
  },
  argTypes: {
    id: { type: 'string' },
  },
};

export const Template = (args: IInput) => {
  return (
    <div style={{ width: '300px' }}>
      <Input {...args} />
    </div>
  );
};
