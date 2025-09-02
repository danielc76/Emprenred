import { BsCart4 } from "react-icons/bs";
import Badge from "react-bootstrap/Badge";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import './css/CartWidget.css'; // Importamos estilos 

const CartWidget = () => {
  // Traemos el carrito desde el contexto
  const { cart } = useContext(CartContext);

  // Calculamos la cantidad total de productos sumando la propiedad 'quantity' de cada item
  const cantidad = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    // Envolvemos todo en un Link para que al hacer clic vaya a /cart
    <Link to="/cart" className="cart-widget">
      <BsCart4 size={24} /> {/* Ícono del carrito */}
      
      {/* Mostramos el badge solo si hay productos en el carrito */}
      {cantidad > 0 && (
        <Badge bg="danger" className="cart-badge">
          {cantidad}
        </Badge>
      )}
    </Link>
  );
};

export default CartWidget;
