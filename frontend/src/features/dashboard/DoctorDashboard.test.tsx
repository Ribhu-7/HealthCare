import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DoctorDashboard from './DoctorDashboard';
import { BrowserRouter } from 'react-router-dom';

describe('DoctorDashboard', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <DoctorDashboard />
      </BrowserRouter>
    );
    // There isn't explicit 'Dashboard' text at the root, but it is a functional component
    expect(screen.getByRole('button', { name: /Run Diagnostics/i })).toBeInTheDocument();
  });
});
