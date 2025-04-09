import '@testing-library/jest-dom';

import { render, waitFor } from '@testing-library/react';
import { screen } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, MockInstance, vi } from 'vitest';

import { TodoDetail } from '../components/todo-detail.component';

describe('todo-detail component tests', () => {
  beforeEach(() => {
    window.fetch = vi.fn(); // Mock fetch on the window object
  });

  afterEach(() => {
    vi.restoreAllMocks(); // Restore all mocks after each test
  });

  it('renders fallback UI when fetch throws an error', async () => {
    vi.spyOn(window, 'fetch').mockRejectedValueOnce(new Error('Network Error'));
    render(<TodoDetail todoId={1} />);

    await waitFor(() => {
      expect(screen.getByText(/error loading todo/i)).toBeInTheDocument();
    });
  });

  it('renders completed status correctly', async () => {
    const mockTodo = { id: 1, title: 'Completed Todo', completed: true, userId: 1 };

    (window.fetch as unknown as MockInstance).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTodo,
    });

    render(<TodoDetail todoId={1} />);

    await waitFor(() => {
      expect(screen.getByText('Completed Todo')).toBeInTheDocument();
      expect(screen.getByText('Completed')).toBeInTheDocument();
    });
  });

  it('renders error message on fetch failure', async () => {
    (window.fetch as unknown as MockInstance).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    render(<TodoDetail todoId={1} />);

    await waitFor(() => {
      expect(screen.getByText(/error loading todo/i)).toBeInTheDocument();
    });
  });

  it('refetch todo when todoId changes', async () => {
    const mockTodo1 = { id: 1, title: 'Todo 1', completed: false, userId: 1 };
    const mockTodo2 = { id: 2, title: 'Todo 2', completed: true, userId: 1 };

    (window.fetch as unknown as MockInstance).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTodo1,
    });

    const { rerender } = render(<TodoDetail todoId={1} />);

    await waitFor(() => {
      expect(screen.getByText('Todo 1')).toBeInTheDocument();
    });

    (window.fetch as unknown as MockInstance).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTodo2,
    });

    rerender(<TodoDetail todoId={2} />);

    await waitFor(() => {
      expect(screen.getByText('Todo 2')).toBeInTheDocument();
    });
  });
});
