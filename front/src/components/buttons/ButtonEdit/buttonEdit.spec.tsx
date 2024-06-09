/* eslint-disable @next/next/no-img-element */
import { render, screen } from '@testing-library/react';
import ButtonEdit from '.';

jest.mock('next/image', () => ({
  __esModule: true,
  // Aqui replicamos apenas o comportamento necessário para o teste
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

describe('<ButtonEdit/>', () => {
  it('should render', () => {
    render(<ButtonEdit />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should render icon', () => {
    render(<ButtonEdit />);
    const icon = screen.getByRole('img', { name: 'Icone de editar' });
    expect(icon).toBeInTheDocument();
  });
});
