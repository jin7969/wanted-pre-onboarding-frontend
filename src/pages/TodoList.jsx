import { useEffect } from "react";
import { ROUTES } from "../constants";
import { useNavigate } from "react-router-dom";

function TodoList() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate(ROUTES.HOME);
      alert("로그인 해주세요.");
    }
  }, []);

  return (
    <div>
      <div>투두</div>
    </div>
  );
}

export default TodoList;
