import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AppointmentListPage from './AppointmentListPage';
import { BrowserRouter } from 'react-router-dom';

describe('AppointmentListPage', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <AppointmentListPage />
      </BrowserRouter>
    );
    expect(screen.getByText('Appointment Schedule')).toBeInTheDocument();
  });
});
