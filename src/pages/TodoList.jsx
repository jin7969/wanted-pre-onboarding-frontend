import { useEffect, useState } from "react";
import { API_BASE_URL, ROUTES } from "../constants";
import { useNavigate } from "react-router-dom";
import AddTodo from "../components/AddTodo";
import Todo from "../components/Todo";

function TodoList() {
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  const DeleteTodo = (id) => {
    fetch(`${API_BASE_URL}/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (response.status !== 204) throw new Error(`${response.status}`);
        getTodoList();
      })
      .catch((error) =>
        alert(`TODO 삭제 에러가 발생했습니다. \n에러내용: ${error}`)
      );
  };

  const CreateTodo = (todo) => {
    fetch(`${API_BASE_URL}/todos`, {
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
        alert(`TODO를 등록 에러가 발생했습니다. \n에러내용 ${error}`)
      );
  };

  const getTodoList = () => {
    fetch(`${API_BASE_URL}/todos`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTodoList(data);
      })
      .catch((error) =>
        alert(`TODO_LIST 조회 에러가 발생했습니다. \n에러내용: ${error}`)
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
        {todoList.map((item) => (
          <Todo key={item.id} item={item} onDelete={DeleteTodo} />
        ))}
      </ul>
      <AddTodo onAdd={CreateTodo} />
    </main>
  );
}

export default TodoList;
