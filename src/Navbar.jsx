import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        <img src="/src/img/StudyGoNav.png" alt="StudyGo"></img>
      </Link>
      <ul>
        <CustomLink to="/studyplan/studyplan" className="site-studyplan">
          Lernplan
        </CustomLink>
        <CustomLink to="/todos/todos" className="site-todo">
          Todos
        </CustomLink>
        <CustomLink to="/flashcards" className="site-flashcards">
          Flash-Cards
        </CustomLink>
        <CustomLink to="/user">User</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
