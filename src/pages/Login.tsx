import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import TodoService from "../server/server";
import Container from "../components/Container";
import Header from "../components/Header";
import "./styles/Login.css";

let todoService = new TodoService();

function Login() {
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
      let loginData = await todoService.login(username, password);

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
      <Header loggedIn={loggedIn} username="" />
      <Container>
        <h1>Login</h1>
        <div className="Login">
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
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                handleButtonClick();
              }
            }}
          />
          <button className="button" onClick={handleButtonClick}>
            Login
          </button>
        </div>
        <div>
          <h2>
            If you dont have account click <Link to={"/register"}>here</Link> to
            sign up.
          </h2>
        </div>
      </Container>
    </>
  );
}

export default Login;
