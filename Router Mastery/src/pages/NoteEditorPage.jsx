import { useParams } from "react-router-dom";

export default function NoteEditorPage() {
  const { noteId } = useParams();
  return (
    <div>
      <h1>Note Editor: {noteId}</h1>
    </div>
  );
}
