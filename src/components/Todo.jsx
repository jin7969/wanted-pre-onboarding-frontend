function Todo({ item, onUpdate, onDelete }) {
  const { id, todo } = item;

  const onClickDeleteButton = () => {
    onDelete(todo.id);
  };

  return (
    <li>
      <input type="checkbox" id={id} />
      <label htmlFor={id}>{todo}</label>
      <button onClick={onClickDeleteButton}>수정</button>
      <button onClick={onClickDeleteButton}>삭제</button>
    </li>
  );
}

export default Todo;
