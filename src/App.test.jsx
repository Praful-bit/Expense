import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders hello world', () => {
    render(<App />);
    const linkElement = screen.getByText("hello world");
    expect(linkElement).toBeInTheDocument();
  });
});
