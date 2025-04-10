// src/components/TodoList.tsx

import React, { useEffect, useState } from 'react';

import { Todo } from '../types/todo-type';

type FilterType = 'all' | 'open' | 'completed';

interface TodoListProps {
  onSelectTodo: (id: number) => void;
}
interface FetchTodosParams {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}
/**
 * fetchTodos function fetches todos from the API and updates the state.
 * @param setTodos - React setState Function to set the todos state.
 * @param setFilteredTodos - React setState Function to set the filtered todos state.
 * @param setLoading - react setState Function to set the loading state.
 * @param setError - react setState Function to set the error state.
 *
 * @returns {Promise<void>} - A promise that resolves when the todos are fetched and state is updated.  You should call this in useEffect.
 * setup useEffect to call this function when the component mounts
 * wraps the fetch API call in a try-catch block to handle errors gracefully and update the loading and error states accordingly.
 * The function uses async/await syntax to handle asynchronous operations, making the code cleaner and easier to read.
 * fetch from the URL https://jsonplaceholder.typicode.com/todos
 */
// remove eslint-disable-next-line @typescript-eslint/no-unused-vars when you use the parameters in the function
export const fetchTodos = async ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTodos,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setFilteredTodos,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setLoading,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setError,
}: FetchTodosParams): Promise<void> => {
  try {
    setLoading(true);
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: Todo[] = await response.json();
    setTodos(data);
    setFilteredTodos(data);
    setLoading(false);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'An unknown error occurred');
    setLoading(false);
  }
};
/**
 * TodoList component fetches todos from the API and displays them in a list.
 * It also provides filter buttons to filter the todos based on their completion status.
 * @param onSelectTodo - A function that is called when a todo is selected. It receives the todo id as an argument.
 * @returns
 */

// remove the following line when you use onSelectTodo in the component
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const TodoList: React.FC<TodoListProps> = ({ onSelectTodo }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos({ setTodos, setFilteredTodos, setLoading, setError });
  }, []); // Empty dependency array means this effect runs only once on mount

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredTodos(todos);
    } else if (activeFilter === 'open') {
      setFilteredTodos(todos.filter((todo) => !todo.completed));
    } else if (activeFilter === 'completed') {
      setFilteredTodos(todos.filter((todo) => todo.completed));
    }
  }, [todos, activeFilter]);

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
  };

  if (loading) {
    return <div>Loading todos...</div>;
  }

  if (error) {
    return <div>Error loading todos: {error}</div>;
  }
  return (
    <div className="todo-list">
      <h2>Todo List</h2>
      <div className="filter-buttons">
        <button
          className={activeFilter === 'all' ? 'active' : ''}
          onClick={() => handleFilterChange('all')}
          data-testid="filter-all"
        >
          All
        </button>
        <button
          className={activeFilter === 'open' ? 'active' : ''}
          onClick={() => handleFilterChange('open')}
          data-testid="filter-open"
        >
          Open
        </button>
        <button
          className={activeFilter === 'completed' ? 'active' : ''}
          onClick={() => handleFilterChange('completed')}
          data-testid="filter-completed"
        >
          Completed
        </button>
      </div>
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <button
              className={`todo-button ${todo.completed ? 'completed' : ''}`}
              onClick={() => onSelectTodo(todo.id)}
              aria-label={`Mark ${todo.title} as ${todo.completed ? 'incomplete' : 'complete'}`}
            >
              <span>{todo.title}</span>
              <span>{todo.completed ? '✅' : '❌'}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
