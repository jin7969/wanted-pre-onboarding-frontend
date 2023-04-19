import { useState } from "react";

function Todo({ item, onUpdate, onDelete }) {
  const { id, todo, isCompleted } = item;
  const [isModify, setModify] = useState(false);
  const [text, setText] = useState(todo);

  const onChangeCheckbox = (e) => {
    onUpdate(id, todo, e.target.checked);
  };

  const handleSubmitButtonClick = () => {
    if (text.trim().length === 0) return;

    onUpdate(id, text, isCompleted);
    setModify(false);
  };

  return (
    <li>
      <input
        type="checkbox"
        id={id}
        checked={isCompleted}
        onChange={onChangeCheckbox}
      />
      {isModify ? (
        <>
          <input
            type="text"
            value={text}
            data-testid="modify-input"
            onChange={(e) => setText(e.target.value)}
          />
          <button data-testid="submit-button" onClick={handleSubmitButtonClick}>
            제출
          </button>
          <button data-testid="cancel-button" onClick={() => setModify(false)}>
            취소
          </button>
        </>
      ) : (
        <>
          <label htmlFor={id}>{todo}</label>
          <button data-testid="modify-button" onClick={() => setModify(true)}>
            수정
          </button>
          <button data-testid="delete-button" onClick={() => onDelete(id)}>
            삭제
          </button>
        </>
      )}
    </li>
  );
}

export default Todo;
