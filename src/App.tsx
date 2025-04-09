// src/App.tsx

import './App.css';

import React, { useState } from 'react';

import { TodoDetail } from './components/todo-detail.component';
import { TodoList } from './components/todo-list.component';

const App: React.FC = () => {
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const handleBackToList = () => {
    setSelectedTodoId(null);
  };

  return (
    <div className="app">
      <h1>CS394 useEffect Lab</h1>

      {selectedTodoId ? (
        <div>
          <TodoDetail todoId={selectedTodoId} />
          <button onClick={handleBackToList}>Back to List</button>
        </div>
      ) : (
        <div>
          <TodoList onSelectTodo={(id) => setSelectedTodoId(id)} />
        </div>
      )}
    </div>
  );
};

export default App;
