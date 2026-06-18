import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DoctorListPage from './DoctorListPage';
import { BrowserRouter } from 'react-router-dom';

describe('DoctorListPage', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <DoctorListPage />
      </BrowserRouter>
    );
    expect(screen.getByText('Doctor & Staff Directory')).toBeInTheDocument();
  });
});
