// Contexto global para manejar el carrito en toda la app

import { createContext, useContext, useState } from "react";

// Creo el contexto del carrito, que luego voy a usar en toda la app
export const CartContext = createContext(); // <-- agrego 'export' para poder importarlo nombrado

// Hook para poder usar el contexto más fácil en cualquier componente
export const useCart = () => useContext(CartContext);

// Provider: acá defino el "estado global" del carrito
export const CartProvider = ({ children }) => {
  // Estado principal: lista de productos en el carrito
  const [cart, setCart] = useState([]);

  // Agregar un producto al carrito
  const addToCart = (product, quantity = 1) => {
    // Fijo si el producto ya está en el carrito
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      // Si ya está, le sumo la cantidad
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      // Si no está, lo agrego con la cantidad inicial
      setCart([...cart, { ...product, quantity }]);
    }
  };

  // Eliminar un producto completamente del carrito
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Vaciar el carrito
  const clearCart = () => {
    setCart([]);
  };

  // Calcular la cantidad total de productos
  const getCartQuantity = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  // Calcular el total a pagar
  const getCartTotal = () => {
    // Ojo: por si algunos productos vienen con 'precio' en lugar de 'price'
    return cart.reduce((acc, item) => acc + (item.price ?? item.precio) * item.quantity, 0);
  };

  // Acá paso todas las funciones y datos que quiero que estén disponibles en toda la app
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getCartQuantity,
        getCartTotal,

        // --- Alias de compatibilidad para no romper componentes que ya usan estos nombres ---
        // (los dejo a propósito para migrar tranquilo si hace falta)
        cartItems: cart,                           // algunos componentes leen 'cartItems'
        addItem: (product) => {                    // algunos llaman addItem(producto con {quantity})
          const qty = product.quantity ?? 1;
          const normalized = {
            ...product,
            // Normalizo claves por si vienen como 'precio' y 'foto' desde Firestore
            price: product.price ?? product.precio,
            img: product.img ?? product.foto,
          };
          addToCart(normalized, qty);
        },
        removeItem: removeFromCart,                // alias
        clear: clearCart,                          // alias
        cartTotal: getCartTotal,                   // alias
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
