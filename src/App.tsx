import { useState, useEffect } from "react";
import Header from "./components/Header";
import Input from "./components/Input";
import Container from "./components/Container";
import Todos from "./components/Todos";
import { TodoType } from "./types";
import "./App.css";
import TodoService from "./server/server";

const todoService = new TodoService();

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const todosData = await todoService.getTodos();
      setTodos(todosData);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Todo Functions
  const addTodo = async (newTodo: string) => {
    let data = await todoService.addTodoToServer(newTodo);
    setTodos(
      data.map((todo: String, index: number) => ({
        id: index,
        todo: todo,
      }))
    );
  };

  const removeTodo = async (todoId: number) => {
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
      <Header />
      <Container>
        <Input onClick={addTodo} />
        {loading ? <></> : <Todos todos={todos} onDelete={removeTodo} />}
      </Container>
    </>
  );
}

export default App;
