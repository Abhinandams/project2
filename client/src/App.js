import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Saved from './pages/Saved';
import Login from './pages/Login';
import Summarizer from "./pages/summarizer";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/login" element={<Login />} />
        <Route path="/summarizer" element={<Summarizer />} />
      </Routes>
    </Router>
  );
}

export default App;
