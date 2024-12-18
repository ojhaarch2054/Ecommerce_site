import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Everything from './components/Everything';
import About from './components/About';
import Contact from './components/ContactUs';
import Cart from './components/Cart';
import Profile from './components/Profile';
import LogIn from './components/LogIn';
import { CartProvider } from './context/CartContext';
import ProductDetail from './components/SeprateProductDetail';

function App() {
  return (
    <CartProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Everything />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/logIn' element={<LogIn />} />
          <Route path="/product/:id" element={<ProductDetail />} /> 
          </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;