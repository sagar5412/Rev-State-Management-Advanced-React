import { Outlet } from "react-router-dom";

export default function NoteLayout() {
  return (
    <div>
      <h2>Notes Layout</h2>
      <Outlet />
    </div>
  );
}
