// agrego para ver si anda
// // Importamos los estilos de Bootstrap y nuestro propio CSS

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Importamos los componentes  
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import NotFound from './components/NotFound';

// Importamos lo necesario para manejar rutas
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { CartProvider } from './context/CartContext';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

function App() {
  return (
    // Envolvemos la app con BrowserRouter para que funcione el sistema de rutas
    <BrowserRouter>
      {/* Envolvemos toda la app con CartProvider para que los componentes tengan acceso al carrito */}
      <CartProvider>
        {/* Este es el menú de navegación, va a estar siempre visible */}
        <NavBar />

        {/* Acá van las distintas rutas que puede visitar el usuario */}
        <Routes>
          {/* Ruta principal (cuando entra al sitio) */}
          <Route
            path="/"
            element={<ItemListContainer saludo="Bienvenidos a la tienda de emprendedores" />}
          />

          {/* Ruta que muestra productos filtrados por categoría (ej: /categories/mates) */}
          <Route
            path="/categories/:category"
            element={<ItemListContainer saludo="Estás viendo productos de la categoría:" />}
          />

          {/* Ruta para ver el detalle de un producto individual (ej: /item/5) */}
          <Route
            path="/item/:id"
            element={<ItemDetailContainer />}
          />

          {/* Ruta del carrito */}
          <Route
            path="/cart"
            element={<Cart />}
          />

          {/* Ruta para checkout */}
          <Route
            path="/checkout"
            element={<Checkout />}
          />

          {/* Ruta para cuando el usuario escribe mal una dirección, muestra error 404 */}
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
