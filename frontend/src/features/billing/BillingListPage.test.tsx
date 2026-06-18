import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BillingListPage from './BillingListPage';

describe('BillingListPage', () => {
  it('renders without crashing', () => {
    render(<BillingListPage />);
    expect(screen.getByText('Billing Overview')).toBeInTheDocument();
  });
});
