import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Documents from "./pages/Documents";
import Faq from "./pages/FAQ";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/documents" element={<Documents />} />
      <Route path="/faq" element={<Faq />} />
    </Routes>
  );
}

export default App;
