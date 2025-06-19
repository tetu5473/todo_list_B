import React, { useState } from 'react';

// "Todo" 型の定義をコンポーネント外で行います
type Todo = {
  title: string;
  readonly id: number;
};

// Todo コンポーネントの定義
const Todo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // Todoの配列を保持するステート
  const [text, setText] = useState(''); // フォーム入力のためのステート
  const [nextId, setNextId] = useState(1); // 次のTodoのIDを保持するステート

  // todos ステートを更新する関数（追加）
  const handleSubmit = () => {
    if (!text) return;

    const newTodo: Todo = {
      title: text,
      id: nextId,
    };

    setTodos((prevTodos) => [newTodo, ...prevTodos]);
    setNextId(nextId + 1);
    setText('');
  };

  const handleEdit = (id: number, value: string) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          // 新しいオブジェクトを作成して返す
          return { ...todo, title: value };
        }
        return todo;
      });
  
  
      // todos ステートが書き換えられていないかチェック
      console.log('=== Original todos ===');
      todos.map((todo) => {
        console.log(`id: ${todo.id}, title: ${todo.title}`);
      });
  
  
      return newTodos;
    });
  };
  
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="submit"
          value="追加"
        />
      </form>

      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                type="text"
                value={todo.title}
                onChange={(e) => handleEdit(todo.id, e.target.value)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todo;
