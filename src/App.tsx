import { useState, useEffect } from "react";
import Header from "./components/Header";
import Input from "./components/Input";
import Container from "./components/Container";
import Todos from "./components/Todos";
import { TodoType } from "./types";
import "./App.css";

async function getTodos() {
  const apiUrl = "https://todo-api-hakan.fly.dev/todos";
  const JWT = localStorage.getItem("JWT");

  if (JWT !== null) {
    let token: string = JSON.parse(JWT);
    const headers = new Headers();
    headers.append("Authorization", `Bearer: ${token}`);

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data.map((todo: string, index: number) => ({
        id: index,
        todo: todo,
      }));
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  return [];
}

async function addTodoToServer(newTodo: String) {
  const apiUrl = "https://todo-api-hakan.fly.dev/todos";
  const JWT = localStorage.getItem("JWT");

  if (JWT !== null) {
    let token: string = JSON.parse(JWT);
    const headers = new Headers();
    headers.append("Authorization", `Bearer: ${token}`);
    headers.append("Content-Type", "application/json");

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          content: newTodo,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  }
}

async function deleteTodo(todoId: number) {
  const apiUrl = `https://todo-api-hakan.fly.dev/todos/${todoId}`;
  const JWT = localStorage.getItem("JWT");

  if (JWT !== null) {
    let token: string = JSON.parse(JWT);
    const headers = new Headers();
    headers.append("Authorization", `Bearer: ${token}`);
    headers.append("Content-Type", "application/json");

    try {
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  }
}

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const todosData = await getTodos();
      setTodos(todosData);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Todo Functions
  const addTodo = async (newTodo: string) => {
    let data = await addTodoToServer(newTodo);
    setTodos(
      data.map((todo: String, index: number) => ({
        id: index,
        todo: todo,
      }))
    );
  };

  const removeTodo = async (todoId: number) => {
    let data = await deleteTodo(todoId);
    setTodos(
      data.map((todo: String, index: number) => ({
        id: index,
        todo: todo,
      }))
    );
  };

  return (
    <>
      <Header />
      <Container>
        <Input onClick={addTodo} />
        {loading ? <></> : <Todos todos={todos} onDelete={removeTodo} />}
      </Container>
    </>
  );
}

export default App;
