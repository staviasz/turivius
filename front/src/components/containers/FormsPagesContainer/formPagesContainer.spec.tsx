import { render, screen } from '@testing-library/react';
import FormPagesContainer from '.';

const FormPagesContainerStub = () => (
  <FormPagesContainer>
    <form
      role="form"
      action=""
      style={{
        width: '300px',
        backgroundColor: 'white',
        padding: '16px',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <h2>StoryBook</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label role="label" htmlFor="name">
          nome:{' '}
        </label>
        <input type="text" id="name" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label role="label" htmlFor="email">
          e-mail:{' '}
        </label>
        <input type="text" id="email" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label role="label" htmlFor="password">
          senha:{' '}
        </label>
        <input type="text" id="password" />
      </div>
    </form>
  </FormPagesContainer>
);

describe('</>', () => {
  it('should render', () => {
    render(<FormPagesContainerStub />);
    const title = screen.getByRole('heading', { name: 'Turivius' });
    expect(title).toBeInTheDocument();
  });

  it('should render form', () => {
    render(<FormPagesContainerStub />);
    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();
  });

  it('should render 3 inputs and 3 labels', () => {
    render(<FormPagesContainerStub />);
    const inputs = screen.getAllByRole('textbox');
    const labels = screen.getAllByRole('label');
    expect(inputs).toHaveLength(3);
    expect(labels).toHaveLength(3);
  });
});
