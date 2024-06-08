import Logo from '.';

export default {
  title: 'Logo',
  component: Logo,
  args: {
    children: 'nao sei',
  },
  argTypes: {
    children: { type: 'string' },
  },
};

export const Template = () => {
  return (
    <div>
      <Logo />
    </div>
  );
};
