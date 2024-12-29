import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Everything from './components/Everything';
import About from './components/About';
import Contact from './components/ContactUs';
import Cart from './components/Cart';
import Profile from './components/Profile';
import LogIn from './components/LogIn';
import { CartProvider } from './context/CartContext';
import ProductDetail from './components/SeprateProductDetail';
import SignUp from './components/SignUp';
import Home from './components/Home';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signUp' element={<SignUp />} />
          <Route path='/everything' element={<Everything />} />
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