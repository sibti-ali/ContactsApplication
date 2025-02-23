import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Add from "./pages/Add";
import Contacts from "./pages/Contacts";
import Update from "./pages/Update";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav className="navbar navbar-light bg-light p-3">
          <Link className="navbar-brand" to="/"><h3>Home</h3></Link>
          
        </nav>
        <Routes>
          <Route path="/" element={<Contacts />} /> 
          <Route path="/add" element={<Add />} /> 
          <Route path="/update/:id" element={<Update />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;