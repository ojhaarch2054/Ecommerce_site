import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Everything from './components/Everything';
import Women from './components/Women';
import Men from './components/Men';
import Accessories from './components/Accessories';
import About from './components/About';
import Contact from './components/ContactUs';
import Cart from './components/Cart';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Everything />} />
        <Route path='/women' element={<Women />} />
        <Route path='/men' element={<Men />} />
        <Route path='/accessories' element={<Accessories />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;