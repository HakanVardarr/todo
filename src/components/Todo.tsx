import { TodoType } from "../types";
import "./styles/Todo.css";

type Props = {
  todo: TodoType;
  onDelete: (todoID: number) => void;
};

export default function Todo({ todo, onDelete }: Props) {
  return (
    <>
      <div className="Todo">
        <h1 className="content">{todo.todo}</h1>
        <button className="deleteButton" onClick={() => onDelete(todo.id)}>
          X
        </button>
      </div>
    </>
  );
}
