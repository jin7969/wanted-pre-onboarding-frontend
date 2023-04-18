import { useEffect, useState } from "react";
import { ROUTES } from "../constants";
import { useNavigate } from "react-router-dom";
import AddTodo from "../components/AddTodo";
import Todo from "../components/Todo";

function TodoList() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([
    { id: "123", text: "장보기" },
    { id: "124", text: "공부하기" },
    { id: "125", text: "코딩하기" },
  ]);

  const handleAddTodo = (value) => setTodos((prev) => [...prev, value]);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate(ROUTES.HOME);
      alert("로그인 해주세요.");
    }
  }, []);

  return (
    <main>
      <ul>
        {todos.map((item) => (
          <Todo key={item.id} todo={item} />
        ))}
      </ul>
      <AddTodo onAdd={handleAddTodo} />
    </main>
  );
}

export default TodoList;
