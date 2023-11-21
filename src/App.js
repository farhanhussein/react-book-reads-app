import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';

//Pages
import BookDetail from './pages/BookDetail';
import Favorites from './pages/Favorites';
import Explore from './pages/Explore';
import About from './pages/About';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import BookList from './pages/BookList';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasikan beban data atau operasi yang memerlukan waktu
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Ganti dengan waktu yang sesuai

  }, []);

  return (
    <div className="App">

      {loading ? (
        <SplashScreen />
      ) : (
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
        </Router>
      )}
    </div>
  );
}

export default App;
