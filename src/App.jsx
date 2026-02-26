import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BrowseBooks from './pages/BrowseBooks';
import BookDetails from './pages/BookDetails';
import AddBook from './pages/AddBook';
import NotFound from './pages/NotFound';

import Login from './pages/Login';
import Register from './pages/Register';

// Wrapper component to conditionally render Navbar
const Layout = ({ children }) => {
  // location removed because it is unused
  // Check if current path is a 404 page (handled by generic matching in Routes, but here we can't easily know if it matched * unless we move Layout inside Routes or inspect state. 
  // However, simpler approach: The NotFound component is a page. Route path="*" matches everything else.
  // We can just check if the current path strictly matches known routes or trying to make it generic.
  // Actually, usually 404 pages shouldn't have the navbar as per requirements.
  // The requirement says: "The 404 page... should not include the Header component."

  // Best way: layout normally has navbar. But 404 route is special.
  // We can render Navbar in the Routes wrapper or checking location.
  // Let's rely on Routes to render Layout, or render Navbar conditionally.

  // Since 404 is a catch-all, we don't know if it's 404 until routing happens.
  // But we can organize routes so that valid routes share a layout with Navbar.
  return (
    <>
      <Navbar />
      <div className="pt-0">
        {children}
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/books" element={<Layout><BrowseBooks /></Layout>} />
        <Route path="/books/:category" element={<Layout><BrowseBooks /></Layout>} />
        <Route path="/book/:id" element={<Layout><BookDetails /></Layout>} />
        <Route path="/add-book" element={<Layout><AddBook /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
