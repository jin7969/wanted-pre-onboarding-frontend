import { useState } from "react";
import { USER_DATA } from "../constants";

const useUserDataForm = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [isDisabled, setDisabled] = useState({
    isEmail: true,
    isPassword: true,
  });

  const handleChangeUserData = (e) => {
    const target = e.target;
    setUserData((prev) => {
      return { ...prev, [target.id]: target.value };
    });

    if (target.id === "email") {
      const boolean = target.value.includes(USER_DATA.EMAIL_ADDRESS_FORMAT)
        ? false
        : true;
      setDisabled((prev) => {
        return { ...prev, isEmail: boolean };
      });
      return;
    }
    if (target.id === "password") {
      const boolean =
        target.value.length >= USER_DATA.PASSWORD_MIN_LENGTH ? false : true;
      setDisabled((prev) => {
        return { ...prev, isPassword: boolean };
      });
    }
  };

  return { userData, isDisabled, handleChangeUserData };
};

export default useUserDataForm;
