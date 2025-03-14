import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PaginationList from '../PaginationList/PaginationList';
import { useTranslation } from 'react-i18next';
import { vi } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));


describe('PaginationList Component', () => {
  const onPageChange = vi.fn();
  const onRowsPerPageChange = vi.fn();
  const defaultProps = {
    count: 100,
    rowsPerPage: 10,
    page: 1,
    onPageChange,
    onRowsPerPageChange,
  };

  it('renders correctly for small screens', () => {
    render(<PaginationList {...defaultProps} />);
    expect(screen.getByLabelText('rows per page')).toBeInTheDocument();
  });

  it('renders correctly for large screens', () => {
    render(<PaginationList {...defaultProps} />);
    expect(screen.getByTestId('table-pagination')).toBeInTheDocument();
  });

  it('triggers onPageChange when page is changed', () => {
    render(<PaginationList {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(onPageChange).toHaveBeenCalled();
  });

  it('triggers onRowsPerPageChange when rows per page changes', () => {
    render(<PaginationList {...defaultProps} />);
    fireEvent.change(screen.getByLabelText('rows per page'), {
      target: { value: '30' },
    });
    expect(onRowsPerPageChange).toHaveBeenCalled();
  });
});
