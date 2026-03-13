import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Documents from "./pages/Documents";
import Faq from "./pages/FAQ";
import Help from "./pages/Help";
import Login from "./pages/login";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/documents" element={<Documents />} />
      <Route path="/faq" element={<Faq />} /> 
      <Route path="/help" element={<Help />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
