import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PatientListPage from './PatientListPage';
import { BrowserRouter } from 'react-router-dom';

describe('PatientListPage', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <PatientListPage />
      </BrowserRouter>
    );
    expect(screen.getByText('Patient Directory')).toBeInTheDocument();
  });
});
