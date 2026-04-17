import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Documents from "./pages/Documents";
import Projects from "./pages/ProjectsPage";
import ProjectDetails from "./pages/ProjectDetails";
import Faq from "./pages/FAQ";
import Help from "./pages/Help";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/documents" element={<Documents />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:id" element={<ProjectDetails />} />
      <Route path="/faq" element={<Faq />} /> 
      <Route path="/help" element={<Help />} />
      <Route path="/login" element={<Login />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  );
}

export default App;
