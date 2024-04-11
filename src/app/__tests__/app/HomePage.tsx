import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import HomePage from '@/app/page';

describe('Home Page', () => {

  beforeEach(() => {});

  it('Renders Home Page', () => {
    render(<HomePage />);
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });
});

