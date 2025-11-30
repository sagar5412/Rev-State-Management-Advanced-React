// src/router.jsx
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

// Layout components (create these empty files first)
import RootLayout from "./layouts/RootLayout";
import NoteLayout from "./layouts/NoteLayout";
import LoginPage from "./pages/LoginPage";
import NotesListPage from "./pages/NotesListPage";
import NoteEditorPage from "./pages/NoteEditorPage";
import SettingsPage from "./pages/SettingsPage";
import ErrorPage from "./pages/ErrorPage";
import { AuthGuard } from "./guards/AuthGuard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />, // Shows on any route error
    children: [
      // Redirect root to /notes
      { index: true, element: <Navigate to="/notes" replace /> },

      // Public route
      { path: "login", element: <LoginPage /> },

      // Protected routes (we'll guard these)
      {
        path: "notes",
        element: (
          <AuthGuard>
            <NoteLayout />
          </AuthGuard>
        ),
        children: [
          { index: true, element: <NotesListPage /> },
          { path: ":noteId", element: <NoteEditorPage /> }, // Dynamic route
        ],
      },

      { path: "settings", element: <SettingsPage /> },
    ],
  },
]);
