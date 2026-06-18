import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ClinicalAssistantPage from './ClinicalAssistantPage';

describe('ClinicalAssistantPage', () => {
  it('renders without crashing', () => {
    render(<ClinicalAssistantPage />);
    expect(screen.getByText('Clinical')).toBeInTheDocument();
  });
});
