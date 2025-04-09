// src/components/TodoList.test.tsx

/**
 *
 * Summary of Tests for TodoList Component:
 *
 * First, test to make sure we fetch the todos correctly. Then, test the component's rendering and filtering functionality.
 *  **fetchTodos function**:
 *    - Tests the `fetchTodos` function to ensure it fetches todos from the API correctly and handles errors gracefully.
 *
 * Next tests are for the `TodoList` component itself:
 * 1. **renders loading state initially**:
 *    - Verifies that the component displays a loading message while fetching todos.
 *
 * 2. **renders todos after successful fetch**:
 *    - Ensures that todos are rendered correctly after a successful fetch from the API.
 *
 * 3. **renders error message on fetch failure**:
 *    - Checks that an error message is displayed when the API fetch fails.
 *
 * 4. **filters todos when "Open" filter is clicked**:
 *    - Tests that only open (incomplete) todos are displayed when the "Open" filter is selected.
 *
 * 5. **filters todos when "Completed" filter is clicked**:
 *    - Verifies that only completed todos are displayed when the "Completed" filter is selected.
 *
 * 6. **returns to all todos when "All" filter is clicked**:
 *    - Ensures that all todos are displayed when the "All" filter is selected after applying other filters.
 *
 * 7. **does not trigger additional fetch calls when filtering**:
 *    - Confirms that filtering todos does not trigger additional API fetch calls and uses the already fetched data.
 *
 * Suggested Starting Point:
 * - Begin by implementing the `fetchTodos` function. This function should fetch todos from the API and handle errors.
 * - Use the isolated tests in the `describe('fetchTodos function')` block to ensure the function works correctly.
 * - Once `fetchTodos` is working, integrate it into the `TodoList` component and proceed with the other tests.
 */

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MockInstance, vi } from 'vitest';

import { fetchTodos, TodoList } from '../components/todo-list.component';

// Mock fetch API
window.fetch = vi.fn();
describe('fetchTodos function', () => {
  const mockSetTodos = vi.fn();
  const mockSetFilteredTodos = vi.fn();
  const mockSetLoading = vi.fn();
  const mockSetError = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('fetches todos successfully and updates state', async () => {
    const mockTodos = [
      { id: 1, title: 'Todo 1', completed: false },
      { id: 2, title: 'Todo 2', completed: true },
    ];

    (window.fetch as unknown as MockInstance).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTodos,
    });

    await fetchTodos({
      setTodos: mockSetTodos,
      setFilteredTodos: mockSetFilteredTodos,
      setLoading: mockSetLoading,
      setError: mockSetError,
    });

    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(mockSetTodos).toHaveBeenCalledWith(mockTodos);
    expect(mockSetFilteredTodos).toHaveBeenCalledWith(mockTodos);
    expect(mockSetLoading).toHaveBeenCalledWith(false);
    expect(mockSetError).not.toHaveBeenCalled();
  });

  it('handles fetch failure and sets error state', async () => {
    (window.fetch as unknown as MockInstance).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await fetchTodos({
      setTodos: mockSetTodos,
      setFilteredTodos: mockSetFilteredTodos,
      setLoading: mockSetLoading,
      setError: mockSetError,
    });

    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(mockSetError).toHaveBeenCalledWith('HTTP error! Status: 404');
    expect(mockSetLoading).toHaveBeenCalledWith(false);
    expect(mockSetTodos).not.toHaveBeenCalled();
    expect(mockSetFilteredTodos).not.toHaveBeenCalled();
  });

  it('handles network errors gracefully', async () => {
    (window.fetch as unknown as MockInstance).mockRejectedValueOnce(
      new Error('Network error'),
    );

    await fetchTodos({
      setTodos: mockSetTodos,
      setFilteredTodos: mockSetFilteredTodos,
      setLoading: mockSetLoading,
      setError: mockSetError,
    });

    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(mockSetError).toHaveBeenCalledWith('Network error');
    expect(mockSetLoading).toHaveBeenCalledWith(false);
    expect(mockSetTodos).not.toHaveBeenCalled();
    expect(mockSetFilteredTodos).not.toHaveBeenCalled();
  });
});

describe('TodoList Component', () => {
  const mockTodos = [
    { id: 1, title: 'Todo 1', completed: false, userId: 1 },
    { id: 2, title: 'Todo 2', completed: true, userId: 1 },
    { id: 3, title: 'Todo 3', completed: false, userId: 1 },
  ];

  beforeEach(() => {
    vi.resetAllMocks();
    (window.fetch as unknown as MockInstance).mockResolvedValue({
      ok: true,
      json: async () => mockTodos,
    });
  });

  it('renders loading state initially', () => {
    render(<TodoList onSelectTodo={() => {}} />);
    expect(screen.getByText(/loading todos/i)).toBeInTheDocument();
  });

  it('renders todos after successful fetch', async () => {
    render(<TodoList onSelectTodo={() => {}} />);

    await waitFor(() => {
      expect(screen.getByText('Todo 1')).toBeInTheDocument();
      expect(screen.getByText('Todo 2')).toBeInTheDocument();
      expect(screen.getByText('Todo 3')).toBeInTheDocument();
    });
  });

  it('renders error message on fetch failure', async () => {
    (window.fetch as unknown as MockInstance).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    render(<TodoList onSelectTodo={() => {}} />);

    await waitFor(() => {
      expect(screen.getByText(/error loading todos/i)).toBeInTheDocument();
    });
  });

  it('filters todos when "Open" filter is clicked', async () => {
    render(<TodoList onSelectTodo={() => {}} />);

    await waitFor(() => {
      expect(screen.getByText('Todo 1')).toBeInTheDocument();
      expect(screen.getByText('Todo 2')).toBeInTheDocument();
    });

    // Click on the "Open" filter button
    fireEvent.click(screen.getByTestId('filter-open'));

    // Wait for the state update and assert the filtered todos
    await waitFor(() => {
      expect(screen.getByText('Todo 1')).toBeInTheDocument();
      expect(screen.getByText('Todo 3')).toBeInTheDocument();
      expect(screen.queryByText('Todo 2')).not.toBeInTheDocument();
    });
  });

  it('filters todos when "Completed" filter is clicked', async () => {
    render(<TodoList onSelectTodo={() => {}} />);

    // Wait for the initial fetch to complete
    await waitFor(() => {
      expect(screen.getByText('Todo 1')).toBeInTheDocument();
      expect(screen.getByText('Todo 2')).toBeInTheDocument();
    });

    // Click on the "Completed" filter button
    fireEvent.click(screen.getByTestId('filter-completed'));

    // Wait for the state update and assert the filtered todos
    await waitFor(() => {
      expect(screen.queryByText('Todo 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Todo 3')).not.toBeInTheDocument();
      expect(screen.getByText('Todo 2')).toBeInTheDocument();
    });
  });

  it('returns to all todos when "All" filter is clicked', async () => {
    render(<TodoList onSelectTodo={() => {}} />);

    await waitFor(() => {
      expect(screen.getByText('Todo 1')).toBeInTheDocument();
    });

    // First filter to only completed
    fireEvent.click(screen.getByTestId('filter-completed'));

    await waitFor(() => {
      expect(screen.queryByText('Todo 1')).not.toBeInTheDocument();
    });

    // Then go back to all
    fireEvent.click(screen.getByTestId('filter-all'));

    await waitFor(() => {
      expect(screen.getByText('Todo 1')).toBeInTheDocument();
      expect(screen.getByText('Todo 2')).toBeInTheDocument();
      expect(screen.getByText('Todo 3')).toBeInTheDocument();
    });
  });

  it('does not trigger additional fetch calls when filtering', async () => {
    render(<TodoList onSelectTodo={() => {}} />);

    // Wait for initial fetch to complete
    await waitFor(() => {
      expect(screen.getByText('Todo 1')).toBeInTheDocument();
    });

    // Verify fetch was called exactly once
    expect(window.fetch).toHaveBeenCalledTimes(1);

    // Click all filter buttons in sequence
    fireEvent.click(screen.getByTestId('filter-completed'));
    fireEvent.click(screen.getByTestId('filter-open'));
    fireEvent.click(screen.getByTestId('filter-all'));

    // Wait for state updates and verify fetch was still only called once
    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
    });

    expect(window.fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/todos',
    );
  });
});
