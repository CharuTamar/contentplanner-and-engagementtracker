// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ContentList from './pages/ContentList';
import CreateContent from './pages/CreateContent';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ContentList />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateContent />} />
        <Route path="/edit/:id" element={<CreateContent editMode={true} />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
