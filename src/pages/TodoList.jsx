import { useEffect, useState } from "react";
import { API_BASE_URL, ROUTES } from "../constants";
import { useNavigate } from "react-router-dom";
import AddTodo from "../components/AddTodo";
import Todo from "../components/Todo";

function TodoList() {
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  const updateTodo = (id, todo, isCompleted) => {
    fetch(`${API_BASE_URL}/todos/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo,
        isCompleted,
      }),
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        return response.json();
      })
      .then((data) => {
        setTodoList((prev) =>
          prev.map((todo) => {
            if (todo.id === id) return data;
            return todo;
          })
        );
      })
      .catch((error) =>
        alert(`TODO를 등록 에러가 발생했습니다. \n에러내용 ${error}`)
      );
  };

  const deleteTodo = (id) => {
    fetch(`${API_BASE_URL}/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        setTodoList((prev) => prev.filter((todo) => todo.id !== id));
      })
      .catch((error) =>
        alert(`TODO 삭제 에러가 발생했습니다. \n에러내용: ${error}`)
      );
  };

  const createTodo = (todo) => {
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
        if (!response.ok) throw new Error(response.status);
        return response.json();
      })
      .then((data) => {
        setTodoList((prev) => [...prev, data]);
      })
      .catch((error) =>
        alert(`TODO를 등록 에러가 발생했습니다. \n에러내용 ${error}`)
      );
  };

  useEffect(() => {
    if (!accessToken) {
      navigate(ROUTES.HOME);
      alert("로그인 해주세요.");
      return;
    }

    fetch(`${API_BASE_URL}/todos`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        return response.json();
      })
      .then((data) => {
        setTodoList(data);
      })
      .catch((error) =>
        alert(`TODO_LIST 조회 에러가 발생했습니다. \n에러내용: ${error}`)
      );
  }, []);

  return (
    <main>
      <ul>
        {todoList.map((item) => (
          <Todo
            key={item.id}
            item={item}
            onUpdate={updateTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
      <AddTodo onAdd={createTodo} />
    </main>
  );
}

export default TodoList;
