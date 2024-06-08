import RegisterForm from '.';

export default {
  title: 'RegisterForm',
  component: RegisterForm,
  args: {
    children: 'nao sei',
  },
  argTypes: {
    children: { type: 'string' },
  },
};

export const Template = (args: ArgTypes) => {
  return (
    <div>
      <RegisterForm {...args} />
    </div>
  );
};
