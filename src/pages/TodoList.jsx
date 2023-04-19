import { useEffect, useState } from "react";
import { API_BASE_URL, ROUTES } from "../constants";
import { useNavigate } from "react-router-dom";
import AddTodo from "../components/AddTodo";
import Todo from "../components/Todo";

function TodoList() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  const handleAddTodo = async (todo) => {
    await fetch(`${API_BASE_URL}/todos`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo,
      }),
    })
      .then((response) => {
        if (response.status !== 201) throw new Error(`${response.status}`);
        getTodoList();
      })
      .catch((error) =>
        alert(`TODO를 등록하던 중 에러가 발생했습니다. \n에러내용 ${error}`)
      );
  };

  const getTodoList = async () => {
    await fetch(`${API_BASE_URL}/todos`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTodos(data);
      })
      .catch((error) =>
        alert(`todo 데이터 조회 에러가 발생했습니다. \n에러내용: ${error}`)
      );
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate(ROUTES.HOME);
      alert("로그인 해주세요.");
      return;
    }
    getTodoList();
  }, []);

  return (
    <main>
      <ul>
        {todos.map((item) => (
          <Todo key={item.id} item={item} />
        ))}
      </ul>
      <AddTodo onAdd={handleAddTodo} />
    </main>
  );
}

export default TodoList;
