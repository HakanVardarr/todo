import { useState, useEffect } from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import Container from "../components/Container";
import Todos from "../components/Todos";
import { TodoType } from "../types";
import "./styles/Todo.css";
import TodoService from "../server/server";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const todoService = new TodoService();

function Todo() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let todosData = await todoService.getTodos();
      let JWT = await todoService.getJWT();
      if (todosData === null) {
        setLoggedIn(false);
      }
      if (JWT !== null) {
        let username = jwtDecode(JWT).sub;
        if (typeof username === "string") {
          setUsername(username);
        }
      }
      setTodos(todosData);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (!loggedIn) {
    return <Navigate to={"/login"} />;
  }

  // Todo Functions
  const handleAddTodo = async (newTodo: string) => {
    if (newTodo.length > 50) {
      return;
    } else {
      let data = await todoService.addTodoToServer(newTodo);
      setTodos(
        data.map((todo: String, index: number) => ({
          id: index,
          todo: todo,
        }))
      );
    }
  };

  const handleRemoveTodo = async (todoId: number) => {
    let data = await todoService.deleteTodo(todoId);
    setTodos(
      data.map((todo: String, index: number) => ({
        id: index,
        todo: todo,
      }))
    );
  };

  return (
    <>
      <Header loggedIn={loggedIn} username={username} />
      <Container>
        <Input onClick={handleAddTodo} />
        {loading ? <></> : <Todos todos={todos} onDelete={handleRemoveTodo} />}
      </Container>
    </>
  );
}

export default Todo;
