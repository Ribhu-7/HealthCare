import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SystemSettingsPage from './SystemSettingsPage';
import { BrowserRouter } from 'react-router-dom';

describe('SystemSettingsPage', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <SystemSettingsPage />
      </BrowserRouter>
    );
    expect(screen.getByText('System Settings')).toBeInTheDocument();
  });
});
