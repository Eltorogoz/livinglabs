import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Documents from "./pages/Documents";
import Faq from "./pages/FAQ";
import Help from "./pages/Help";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/documents" element={<Documents />} />
      <Route path="/faq" element={<Faq />} /> 
      <Route path="/help" element={<Help />} />
    </Routes>
  );
}

export default App;
