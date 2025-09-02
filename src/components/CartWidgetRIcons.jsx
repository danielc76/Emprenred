// Este componente muestra el ícono del carrito con un número que indica cuántos productos hay
import { BsCart4 } from "react-icons/bs";
import Badge from "react-bootstrap/Badge"; // Importa el "badge" rojo con el número
import { useContext } from "react";
import { CartContext } from "../context/CartContext"; // Importamos el contexto del carrito
import { Link } from "react-router-dom"; // Para que al hacer clic vayamos al carrito

const CartWidget = () => {
  // Traemos los items del carrito desde el contexto
  const { cart } = useContext(CartContext);

  // Calculamos la cantidad total de productos sumando la propiedad 'quantity' de cada item
  const cantidad = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    // Envolvemos todo en un Link para que al hacer clic vaya a /cart
    <Link
      to="/cart"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
        color: "inherit",
        textDecoration: "none",
      }}
    >
      <BsCart4 size={24} /> {/* Ícono del carrito */}
      {/* Mostramos el badge solo si hay productos en el carrito */}
      {cantidad > 0 && <Badge bg="danger">{cantidad}</Badge>}
    </Link>
  );
};

export default CartWidget;
