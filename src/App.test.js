import React from 'react';
import { render } from '@testing-library/react';
import App, {possibleSpins} from './App';

it('displays start button on initial render', () => {
  const {queryByText} = render(<App />);
  expect(queryByText('start')).toBeTruthy();
});

it('does not display stop button on initial render', () => {
  const {queryByText} = render(<App />);
  expect(queryByText('stop')).toBeNull();
});

it('generates 16 spin options', () => {
  expect(possibleSpins.length).toBe(16);
});

