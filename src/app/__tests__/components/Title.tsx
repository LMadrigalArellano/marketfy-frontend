import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import { Title } from '@/components';

describe('Title component', () => {

  beforeEach(() => {});

  it('Renders Provided Text', () => {
    render(
      <Title text='Provided text'/>
    );
    expect(screen.getByText('Provided text')).toBeInTheDocument();
  })
});