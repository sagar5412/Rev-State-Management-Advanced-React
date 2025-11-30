// src/pages/NoteEditorPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

export default function NoteEditorPage() {
  const { noteId } = useParams(); // Gets :noteId from URL
  const navigate = useNavigate();
  const { data: note, loading } = useFetch(`/api/notes/${noteId}`);

  if (loading) return <div>Loading note...</div>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Back</button> {/* Go back */}
      <h1>{note.title}</h1>
      {/* Your editor component here */}
    </div>
  );
}
