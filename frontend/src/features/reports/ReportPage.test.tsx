import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ReportPage from './ReportPage';

describe('ReportPage', () => {
  it('renders report metrics correctly', () => {
    render(<ReportPage />);
    expect(screen.getByText('Run Diagnostics')).toBeInTheDocument();
  });
});
