import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { ROUTES } from "./constants";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Login />} />
        <Route path={ROUTES.SIGNUP} element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
