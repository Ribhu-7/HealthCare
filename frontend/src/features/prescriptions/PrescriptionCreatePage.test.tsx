import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PrescriptionCreatePage from './PrescriptionCreatePage';
import { BrowserRouter } from 'react-router-dom';

describe('PrescriptionCreatePage', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <PrescriptionCreatePage />
      </BrowserRouter>
    );
    expect(screen.getAllByText('Create Prescription')[0]).toBeInTheDocument();
  });
});
