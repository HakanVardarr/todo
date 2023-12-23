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
  const addTodo = (newTodo: string) => {
    setTodos([...todos, { id: Date.now(), todo: newTodo }]);
  };

  const removeTodo = (todoId: number) => {
    let newTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(newTodos);
  };

  return (
    <>
      <Header />
      <Container>
        <Input onClick={addTodo} />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Todos todos={todos} onDelete={removeTodo} />
        )}
      </Container>
    </>
  );
}

export default App;
