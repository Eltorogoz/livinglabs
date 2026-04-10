import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Documents from "./pages/Documents";
import Faq from "./pages/FAQ";
import Help from "./pages/Help";
import Login from "./pages/login";
<<<<<<< HEAD
import Projects from "./pages/Projects";
import Signup from "./pages/Signup";
=======
import Projects from "./pages/projects";
>>>>>>> 41e8543 (updated project code)


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/documents" element={<Documents />} />
      <Route path="/faq" element={<Faq />} /> 
      <Route path="/help" element={<Help />} />
      <Route path="/login" element={<Login />} />
      <Route path="/projects" element={<Projects />} />
<<<<<<< HEAD
        <Route path="/signup" element={<Signup />} />
=======
>>>>>>> 41e8543 (updated project code)
    </Routes>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> 41e8543 (updated project code)
