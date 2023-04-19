function Todo({ item, onDelete }) {
  const { id, todo } = item;

  return (
    <li>
      <input type="checkbox" id={id} />
      <label htmlFor={id}>{todo}</label>
      <button data-testid="modify-button">수정</button>
      <button data-testid="delete-button" onClick={() => onDelete(id)}>
        삭제
      </button>
    </li>
  );
}

export default Todo;
