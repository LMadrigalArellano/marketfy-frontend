import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import { NavBar, StoreProvider } from '@/components';


describe('Top Menu', () => {

  beforeEach(() => {});

  it('Renders Top Menu', () => {
    render(
      <StoreProvider>
        <NavBar />
      </StoreProvider>
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  })
});