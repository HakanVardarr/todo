import { ReactNode } from "react";
import "./styles/Container.css";

type Props = {
  children: ReactNode;
};

export default function Container({ children }: Props) {
  return <div className="Container">{children}</div>;
}
