import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

export default function NotesListPage() {
  const { data: notes, loading, error } = useFetch("/api/notes");

  if (loading) return <div>Loading notes...</div>;
  if (error) return <div>Error loading notes</div>;

  return (
    <div>
      <h1>Notes List</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <Link to={note.id}>{note.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
