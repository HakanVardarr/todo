import "./styles/Header.css";
import GitLogo from "../assets/github-mark.svg";

type Props = {
  loggedIn: boolean;
};

export default function Header({ loggedIn }: Props) {
  return (
    <>
      <header className="Header">
        <h1>Todo App</h1>
        <ul className="navlink">
          <li>
            <a href="https://github.com/HakanVardarr">
              <img className="logo" src={GitLogo} alt="GitLogo" />
            </a>
          </li>
          <li>
            {loggedIn ? (
              <a
                href="/"
                onClick={() => {
                  localStorage.removeItem("JWT");
                }}
              >
                <h2>Logout</h2>
              </a>
            ) : (
              <></>
            )}
          </li>
        </ul>
      </header>
    </>
  );
}
