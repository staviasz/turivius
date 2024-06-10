import { fireEvent, render, screen } from '@testing-library/react';
import TaskForm from '.';

jest.mock('next/image');

describe('<TaskForm/>', () => {
  it('should render heading with text Crie sua conta', () => {
    render(<TaskForm />);
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Adicionar atividade');
  });
  it('should render inputs and labels', () => {
    render(<TaskForm />);
    const labels = screen.getAllByRole('label');

    expect(labels).toHaveLength(3);
    expect(labels[0]).toHaveTextContent('Titulo');
    expect(labels[1]).toHaveTextContent('Data de Execução');
    expect(labels[2]).toHaveTextContent('Descricão');

    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(2);
    expect(inputs[0]).toHaveAttribute('id', 'title');
    expect(inputs[1]).toHaveAttribute('id', 'description');

    const inputDate = screen.getByLabelText('Data de Execução');
    expect(inputDate).toHaveAttribute('type', 'date');
  });

  it('should render select', () => {
    render(<TaskForm />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });

  it('should render button', () => {
    render(<TaskForm />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Cadastrar');
  });
  it('should render error messages of required fields', async () => {
    render(<TaskForm />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(await screen.findByText('O campo titulo é obrigatório')).toBeInTheDocument();
    expect(await screen.findByText('O campo data é obrigatório')).toBeInTheDocument();
    expect(await screen.findByText('O campo descricão é obrigatório')).toBeInTheDocument();
  });

  it('should render error messages in field title', async () => {
    render(<TaskForm />);
    const inputTitle = screen.getByRole('textbox', { name: 'Titulo' });

    fireEvent.change(inputTitle, { target: { value: 'a'.repeat(31) } });

    expect(
      await screen.findByText('O titulo deve ter no maximo 30 caracteres'),
    ).toBeInTheDocument();

    fireEvent.change(inputTitle, { target: { value: 'a' } });

    expect(await screen.findByText('O titulo deve ter no minimo 3 caracteres')).toBeInTheDocument();
  });

  it('should render error messages in field date', async () => {
    render(<TaskForm />);

    const inputDate = screen.getByLabelText('Data de Execução');
    fireEvent.change(inputDate, { target: { value: '2022-01-01' } });
    expect(await screen.findByText('Coloque uma data futura')).toBeInTheDocument();
  });

  it('should render error messages in field description', async () => {
    render(<TaskForm />);
    const inputDescription = screen.getByRole('textbox', { name: 'Descricão' });
    fireEvent.change(inputDescription, { target: { value: 'a'.repeat(256) } });
    expect(
      await screen.findByText('A descricão deve ter no maximo 255 caracteres'),
    ).toBeInTheDocument();

    fireEvent.change(inputDescription, { target: { value: 'a' } });
    expect(
      await screen.findByText('A descricão deve ter no minimo 3 caracteres'),
    ).toBeInTheDocument();
  });
});
