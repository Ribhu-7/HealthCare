import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AdminDashboard from './AdminDashboard';
import { BrowserRouter } from 'react-router-dom';

describe('AdminDashboard', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <AdminDashboard />
      </BrowserRouter>
    );
    expect(screen.getByText('Real-time operational overview for today', { exact: false })).toBeInTheDocument();
  });
});
