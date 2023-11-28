import "./styles/Todos.css";
import Todo from "./Todo";
import { TodoType } from "../types";

type Props = {
  todos: TodoType[];
  onDelete: (todoId: number) => void;
};

export default function Todos({ todos, onDelete }: Props) {
  return (
    <>
      <div className="Todos">
        {todos.map((todo, idx) => (
          <Todo key={idx} todo={todo} onDelete={onDelete} />
        ))}
      </div>
    </>
  );
}
