import { render, screen } from '@testing-library/react';
import PopUp from '.';

describe('<PopUp/>', () => {
  it('should render', () => {
    render(
      <PopUp>
        <h1>StoryBook</h1>
      </PopUp>,
    );
    const heading = screen.getByRole('heading', { name: 'StoryBook' });
    expect(heading).toBeInTheDocument();
  });
});
