import "./styles/Header.css";
import GitLogo from "../../public/github-mark.svg";

export default function Header() {
  return (
    <>
      <header className="Header">
        <h1>Todo App</h1>
        <a href="https://github.com/HakanVardarr">
          <img className="logo" src={GitLogo} alt="GitLogo" />
        </a>
      </header>
    </>
  );
}
