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
<<<<<<< HEAD
import AdminRoute from "./components/AdminRoute.js";


=======
>>>>>>> 5b74d2d0c692a4bf02b3f692dad7ac1291204c1d

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
<<<<<<< HEAD
      <Route path="/admin" element={<AdminRoute> <AdminPanel /> </AdminRoute>}/>
=======
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminPanel />} />
>>>>>>> 5b74d2d0c692a4bf02b3f692dad7ac1291204c1d
    </Routes>
  );
}

export default App;
