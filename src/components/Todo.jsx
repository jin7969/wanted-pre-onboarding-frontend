import { useState } from "react";
import styled from "styled-components";

function Todo({ item, onUpdate, onDelete }) {
  const { id, todo, isCompleted } = item;
  const [isModify, setModify] = useState(false);
  const [text, setText] = useState(todo);

  const onChangeCheckbox = (e) => {
    onUpdate(id, todo, e.target.checked);
  };

  const handleCancelButton = () => {
    setText(todo);
    setModify(false);
  };

  const handleSubmitButton = () => {
    if (text.trim().length === 0) return;

    onUpdate(id, text, isCompleted);
    setModify(false);
  };

  return (
    <S.List>
      <input
        type="checkbox"
        id={id}
        checked={isCompleted}
        onChange={onChangeCheckbox}
      />
      {isModify ? (
        <>
          <S.ModifyInput
            type="text"
            value={text}
            data-testid="modify-input"
            onChange={(e) => setText(e.target.value)}
            autoFocus
          />
          <div>
            <button data-testid="submit-button" onClick={handleSubmitButton}>
              제출
            </button>
            <button data-testid="cancel-button" onClick={handleCancelButton}>
              취소
            </button>
          </div>
        </>
      ) : (
        <>
          <label htmlFor={id}>{todo}</label>
          <div>
            <button data-testid="modify-button" onClick={() => setModify(true)}>
              수정
            </button>
            <button data-testid="delete-button" onClick={() => onDelete(id)}>
              삭제
            </button>
          </div>
        </>
      )}
    </S.List>
  );
}

export default Todo;

const S = {
  List: styled.li`
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;

    button {
      margin: 0 2px;
    }

    label {
      flex: 1 1 0%;
      padding: 0 4px;
    }
  `,
  ModifyInput: styled.input`
    flex: 1 1 0%;
  `,
};
