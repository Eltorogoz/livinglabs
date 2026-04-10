import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Documents from "./pages/Documents";
import Projects from "./pages/ProjectsPage";
import ProjectDetails from "./pages/ProjectDetails";
import Faq from "./pages/FAQ";
import Help from "./pages/Help";
import Login from "./pages/login";
import Projects from "./pages/Projects";
import Signup from "./pages/Signup";


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
    </Routes>
  );
}

export default App;
