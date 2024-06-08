import { fireEvent, render, screen } from '@testing-library/react';
import RegisterForm from '.';

describe('<RegisterForm/>', () => {
  it('should render heading with text Crie sua conta', () => {
    render(<RegisterForm />);
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Login');
  });

  it('should render 2 inputs', () => {
    render(<RegisterForm />);
    const inputs = screen.getAllByRole('textbox');
    const labels = screen.getAllByRole('label');

    expect(labels).toHaveLength(2);

    expect(labels[0]).toHaveTextContent('E-mail');
    expect(labels[1]).toHaveTextContent('Senha');

    expect(inputs).toHaveLength(2);

    expect(inputs[0]).toHaveAttribute('id', 'email');
    expect(inputs[1]).toHaveAttribute('id', 'password');
  });

  it('should render button', () => {
    render(<RegisterForm />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Entrar');
  });

  it('should render error messages of errors values', async () => {
    render(<RegisterForm />);
    const [inputEmail, inputPassword] = screen.getAllByRole('textbox');

    fireEvent.change(inputEmail, { target: { value: 'test555' } });
    expect(inputEmail).toHaveValue('test555');
    expect(await screen.findByText('Preencha um e-mail válido')).toBeInTheDocument();

    fireEvent.change(inputPassword, { target: { value: 'test555' } });
    expect(inputPassword).toHaveValue('test555');
    expect(
      await screen.findByText(
        'A senha deve ter o mínimo de 6 caracteres e conter letras maiúsculas e minúsculas, números e símbolos como ! @ # $ % & * =',
      ),
    ).toBeInTheDocument();
  });

  it('should render error messages of required fields', async () => {
    render(<RegisterForm />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(await screen.findByText('O campo email é obrigatório')).toBeInTheDocument();
    expect(await screen.findByText('O campo senha é obrigatório')).toBeInTheDocument();
  });
});
