import { useState } from "react";

function AddTodo({ onAdd }) {
  const [text, setText] = useState("");

  const handleTodoSubmit = (e) => {
    e.preventDefault();

    if (text.trim().length === 0) return;

    onAdd(text);
    setText("");
  };
  return (
    <form onSubmit={handleTodoSubmit}>
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
        placeholder="Add Todo"
        data-testid="new-todo-input"
      />
      <button data-testid="new-todo-add-button">Add</button>
    </form>
  );
}

export default AddTodo;
