import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import NotFound from './components/NotFound';
import Home from './components/Home';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Cart from './components/Cart';
import CheckOutForm from './components/CheckOutForm';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <NavBar />

        <Routes>
          {/* Landing */}
          <Route path="/" element={<Home />} />

          {/* Tienda: todos los productos */}
          <Route path="/tienda" element={<ItemListContainer />} />

          {/* Productos filtrados */}
          <Route path="/categories/:category" element={<ItemListContainer />} />
          <Route path="/emprendedor/:emprendedor" element={<ItemListContainer />} />
          <Route path="/localidad/:localidad" element={<ItemListContainer />} />

          {/* Detalle de producto */}
          <Route path="/item/:id" element={<ItemDetailContainer />} />

          {/* Carrito y checkout */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/CheckOutForm" element={<CheckOutForm />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
