import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotificationListPage from './NotificationListPage';
import { BrowserRouter } from 'react-router-dom';

describe('NotificationListPage', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <NotificationListPage />
      </BrowserRouter>
    );
    expect(screen.getByText('Inbox')).toBeInTheDocument();
  });
});
