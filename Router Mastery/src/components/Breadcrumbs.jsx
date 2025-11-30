import { Link, useLocation, useParams } from "react-router-dom";

export default function Breadcrumbs() {
  const location = useLocation();
  const { noteId } = useParams();

  const crumbs = location.pathname
    .split("/")
    .filter(Boolean)
    .map((segment, i, arr) => ({
      label: segment === noteId ? `Note ${noteId}` : segment,
      path: "/" + arr.slice(0, i + 1).join("/"),
    }));

  return (
    <nav>
      {crumbs.map((crumb, i) => (
        <span key={crumb.path}>
          {i > 0 && " > "}
          <Link to={crumb.path}>{crumb.label}</Link>
        </span>
      ))}
    </nav>
  );
}
