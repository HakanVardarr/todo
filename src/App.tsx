import { useState } from "react";
import Header from "./components/Header";
import Input from "./components/Input";
import Container from "./components/Container";
import Todos from "./components/Todos";
import { TodoType } from "./types";
import "./App.css";

function getLocalTodos(): TodoType[] {
  // Local Storage
  const storageTodos = localStorage.getItem("todos");
  let localTodos: TodoType[] = [];
  if (storageTodos !== null) {
    localTodos = JSON.parse(storageTodos);
  } else {
    localStorage.setItem("todos", JSON.stringify(localTodos));
  }
  return localTodos;
}

function setLocalTodos(newTodos: TodoType[]) {
  localStorage.setItem("todos", JSON.stringify(newTodos));
}

function App() {
  let localTodos = getLocalTodos();

  // Todos
  let [todos, setTodos] = useState<TodoType[]>(localTodos);

  // Todo Functions
  const addTodo = (newTodo: string) => {
    setTodos([...todos, { id: Date.now(), todo: newTodo }]);
    setLocalTodos([...todos, { id: Date.now(), todo: newTodo }]);
  };

  const removeTodo = (todoId: number) => {
    let newTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(newTodos);
    setLocalTodos(newTodos);
  };

  return (
    <>
      <Header />
      <Container>
        <Input onClick={addTodo} />
        <Todos todos={todos} onDelete={removeTodo} />
      </Container>
    </>
  );
}

export default App;
