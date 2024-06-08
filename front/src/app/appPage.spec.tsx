import { render, screen } from '@testing-library/react';
import AppPage from './page';

describe('<AppPage/>', () => {
  it('should render heading', () => {
    render(<AppPage />);
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Turivius');
  });

  it('should render', () => {
    render(<AppPage />);
    const text = screen.getByRole('paragraph');
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent('Organize suas tarefas e domine sua rotina');
  });

  it('should render buttons', () => {
    render(<AppPage />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveTextContent('Acessar conta');
    expect(buttons[1]).toHaveTextContent('Criar conta');
  });

  it('should link have correct href', () => {
    render(<AppPage />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', '/login');
    expect(links[1]).toHaveAttribute('href', '/register');
  });
});
