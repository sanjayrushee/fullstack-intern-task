import { Routes, Route, Navigate } from "react-router-dom";
import TemplateListPage from "./Pages/Template";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import FavoriteListPage from "./Pages/Favorite";
import ProtectedRoute from "./Route&apis/ProtectedRoute";
import Navbar from "./Components/Navbar";

function App() {

  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/templates" element={<TemplateListPage />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/favorite-templates" element={<FavoriteListPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/templates" replace />} />
      </Routes>
    </>
  );
}

export default App;
