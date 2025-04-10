// src/components/TodoDetail.tsx

import React, { useEffect, useState } from 'react';

import { Todo } from '../types/todo-type';

interface TodoDetailProps {
  todoId: number;
}
/**
 * TodoDetail component fetches and displays the details of a specific todo item based on the provided todoId.
 * It uses the useEffect hook to fetch the todo details from the API when the component mounts or when the todoId changes.
 * @param todoId - The ID of the todo item to fetch and display.
 */
export const TodoDetail: React.FC<TodoDetailProps> = ({ todoId }) => {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/todos/${todoId}`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setTodo(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setLoading(false);
      }
    };

    fetchTodo();
  }, [todoId]); // Re-run the effect when todoId changes

  if (loading) {
    return <div>Loading todo details...</div>;
  }

  if (error) {
    return <div>Error loading todo: {error}</div>;
  }

  if (!todo) {
    return <div>Todo not found</div>;
  }

  return (
    <div className="todo-detail">
      <h2>Todo Details</h2>
      <div>
        <strong>ID:</strong> {todo.id}
      </div>
      <div>
        <strong>Title:</strong> {todo.title}
      </div>
      <div>
        <strong>User ID:</strong> {todo.userId}
      </div>
      <div>
        <strong>Status:</strong> {todo.completed ? 'Completed' : 'Not Completed'}
      </div>
    </div>
  );
};
