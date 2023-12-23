import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import TodoService from "../server/server";
import Container from "../components/Container";
import Header from "../components/Header";
import "./styles/Register.css";

let todoService = new TodoService();

function Register() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let todosData = await todoService.getTodos();
      if (todosData === null) {
        setLoggedIn(false);
      } else {
        setLoggedIn(true);
      }
    };
    fetchData();
  }, []);

  const handleButtonClick = async () => {
    const usernameInput = document.getElementById(
      "username"
    ) as HTMLInputElement;
    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement;
    const username = usernameInput.value;
    const password = passwordInput.value;
    if (username !== "" && password !== "") {
      let loginData = await todoService.register(username, password);

      if (loginData !== null) {
        let token = loginData.split(":")[1].trim();
        localStorage.setItem("JWT", JSON.stringify(token));
        setLoggedIn(true);
      }

      usernameInput.value = "";
      passwordInput.value = "";
    }
  };

  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <Container>
        <h1>Register</h1>
        <div className="Register">
          <input
            className="input"
            id="username"
            type="text"
            placeholder="Username"
          />
          <input
            className="input"
            id="password"
            type="password"
            placeholder="Password"
          />
          <button className="button" onClick={handleButtonClick}>
            Sign up
          </button>
        </div>
      </Container>
    </>
  );
}

export default Register;
