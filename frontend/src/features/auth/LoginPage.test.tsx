import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage';
import { BrowserRouter } from 'react-router-dom';

describe('LoginPage', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    expect(screen.getByText('Staff Login')).toBeInTheDocument();
  });
});
