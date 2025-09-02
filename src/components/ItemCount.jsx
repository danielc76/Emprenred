import { useState } from "react"; 
import Toast from "react-bootstrap/Toast";
import { useNavigate } from "react-router-dom";

// Componente que permite elegir cuántas unidades quiere el usuario
const ItemCount = ({ stock, onAdd, disabled = false }) => {
  const [cantidad, setCantidad] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const incrementar = () => {
    if (!disabled && cantidad < stock) setCantidad(cantidad + 1);
  };

  const decrementar = () => {
    if (!disabled && cantidad > 1) setCantidad(cantidad - 1);
  };

  const confirmarCompra = () => {
    if (disabled || stock === 0) return; // bloqueo total si está agotado
    onAdd(cantidad);
    setShowToast(true);
    setTimeout(() => setShowModal(true), 1500);
  };

  const handleGoCart = () => {
    setShowModal(false);
    navigate("/cart");
  };

  const handleContinue = () => {
    setShowModal(false);
    navigate("/"); // vuelve al Home
    setCantidad(1); // resetea cantidad
  };

  return (
    <div className="d-flex justify-content-center flex-column align-items-center">
      {/* Controles de cantidad */}
      <div className="mb-2">
        <button className="btn btn-info mx-1" onClick={decrementar} disabled={disabled || stock === 0}>
          -
        </button>
        <span className="btn disabled">{cantidad}</span>
        <button className="btn btn-info mx-1" onClick={incrementar} disabled={disabled || stock === 0}>
          +
        </button>
      </div>

      {/* Botón para agregar al carrito */}
      <button
        className="btn btn-primary"
        disabled={disabled || stock === 0}
        onClick={confirmarCompra}
      >
        Agregar al carrito
      </button>

      {/* Toast de confirmación */}
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={2000}
        autohide
        style={{
          position: "fixed",
          bottom: 80,
          right: 20,
          zIndex: 9999,
        }}
      >
        <Toast.Body>Agregaste {cantidad} unidades al carrito</Toast.Body>
      </Toast>

      {/* Modal tipo la profe */}
      {showModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 9999 }}
        >
          <div className="bg-white p-4 rounded text-center">
            <p>¿Querés ir al carrito o seguir comprando?</p>
            <button className="btn btn-success mx-2" onClick={handleGoCart}>
              Ir al carrito
            </button>
            <button className="btn btn-secondary mx-2" onClick={handleContinue}>
              Seguir comprando
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemCount;
