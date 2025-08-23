import { useState } from 'react'
import Toast from 'react-bootstrap/Toast'

// Componente que permite elegir cuántas unidades quiere el usuario
// Recibe `stock` para limitar la cantidad y `onAdd` para agregar al carrito
const ItemCount = ({ stock, onAdd }) => {
  const [cantidad, setCantidad] = useState(1) // Inicializamos en 1
  const [showToast, setShowToast] = useState(false) // Controla la visibilidad del Toast

  // Función para aumentar la cantidad, hasta el stock disponible
  const incrementar = () => {
    if (cantidad < stock) {
      setCantidad(cantidad + 1)
    }
  }

  // Función para disminuir la cantidad, mínimo 1
  const decrementar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1)
    }
  }

  // Función que confirma la compra
  const confirmarCompra = () => {
    // Llamamos a la función que agrega al carrito en ItemDetailContainer
    onAdd(cantidad)
    // Mostramos un Toast como confirmación profesional
    setShowToast(true)
    // Nota: ya no hacemos navigate('/') para que no nos saque de la página
  }

  return (
    <div className="d-flex justify-content-center flex-column align-items-center">
      {/* Controles de cantidad */}
      <div className="mb-2">
        <button className="btn btn-info mx-1" onClick={decrementar}>-</button>
        <span className="btn disabled">{cantidad}</span>
        <button className="btn btn-info mx-1" onClick={incrementar}>+</button>
      </div>

      {/* Botón para agregar al carrito */}
      <button
        className="btn btn-primary"
        disabled={cantidad === 0} // Nunca debería ser 0, pero por seguridad
        onClick={confirmarCompra}
      >
        Agregar al carrito
      </button>

      {/* Toast de confirmación */}
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000} // se oculta automáticamente en 3 segundos
        autohide
        style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999 }}
      >
        <Toast.Body>Agregaste {cantidad} unidades al carrito</Toast.Body>
      </Toast>
    </div>
  )
}

export default ItemCount
