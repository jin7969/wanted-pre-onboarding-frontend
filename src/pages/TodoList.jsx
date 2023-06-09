import { useEffect, useState } from "react";
import { API_BASE_URL, ROUTES, STORAGE_TOKEN_KEY } from "../constants";
import { useNavigate } from "react-router-dom";
import AddTodo from "../components/AddTodo";
import Todo from "../components/Todo";
import styled from "styled-components";

function TodoList() {
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState([]);
  const accessToken = localStorage.getItem(STORAGE_TOKEN_KEY);

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

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_TOKEN_KEY);
    navigate(ROUTES.HOME);
    alert("로그아웃 되었습니다.");
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
    <S.Section>
      <S.LogoutButton onClick={handleLogout}>로그아웃</S.LogoutButton>
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
    </S.Section>
  );
}

export default TodoList;

const S = {
  Section: styled.section`
    padding: 18px;
    width: 70%;
    height: 100%;
    overflow: scroll;
  `,
  LogoutButton: styled.button`
    padding: 4px 8px;
    background-color: #acacac;
    font-weight: bold;
    border: none;
    border-radius: 4px;
  `,
};
