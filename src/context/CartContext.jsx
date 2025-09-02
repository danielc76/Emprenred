// Contexto global para manejar el carrito en toda la app

import { createContext, useContext, useEffect, useState } from "react";

// Creo el contexto del carrito, que luego voy a usar en toda la app
export const CartContext = createContext(); // <-- agrego 'export' para poder importarlo nombrado

// Hook para poder usar el contexto más fácil en cualquier componente
export const useCart = () => useContext(CartContext);

// Provider: acá defino el "estado global" del carrito
export const CartProvider = ({ children }) => {
  // --- Recupero carrito persistido de LocalStorage ---
  const prodLS = JSON.parse(localStorage.getItem("carrito")) || [];

  // Estado principal: lista de productos en el carrito
  const [cart, setCart] = useState(prodLS);

  // --- Cada vez que cambia el carrito, lo guardo en LocalStorage ---
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(cart));
  }, [cart]);

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
    return cart.reduce(
      (acc, item) => acc + (item.price ?? item.precio) * item.quantity,
      0
    );
  };

  // Acá paso todas las funciones y datos que quiero que estén disponibles en toda la app
  return (
    <CartContext.Provider
      value={{
        cart,             // lista de productos
        addToCart,        // agregar producto
        removeFromCart,   // eliminar producto
        clearCart,        // vaciar carrito
        getCartQuantity,  // cantidad total de productos
        getCartTotal,     // total a pagar
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
