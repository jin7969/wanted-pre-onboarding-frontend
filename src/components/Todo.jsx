import { useState } from "react";

function Todo({ item, onDelete }) {
  const [isModify, setModify] = useState(false);
  const { id, todo } = item;

  return (
    <li>
      <input type="checkbox" id={id} />

      {isModify ? (
        <>
          <input type="text" value={todo} data-testid="modify-input" />
          <button data-testid="submit-button">제출</button>
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
