// src/components/CheckOutForm.jsx 
import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext"; // Traemos el contexto del carrito
import { addDoc, collection, doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore"; // Funciones Firestore
import { db } from "../service/firebase"; // Conexión a Firebase
import { Link, useNavigate } from "react-router-dom"; // Para navegación sin recargar
import Toast from "react-bootstrap/Toast"; // Toast para notificaciones

const CheckOutForm = () => {
  const { cart, getCartTotal, clearCart } = useContext(CartContext); // Accedemos al carrito
  const navigate = useNavigate(); // Para redirigir al home cuando sea necesario

  // Estado del comprador
  const [buyer, setBuyer] = useState({
    name: "",
    lastname: "",
    address: "",
    phone: "",
    email: "",
  });
  const [repeatEmail, setRepeatEmail] = useState(""); // Para validar repetición de email
  const [orderId, setOrderId] = useState(null); // Guardará el id de la orden
  const [error, setError] = useState(""); // Mensajes de error
  const [loading, setLoading] = useState(false); // Para deshabilitar el botón mientras procesa
  const [showToast, setShowToast] = useState(false); // Controla la visibilidad del Toast
  const [toastMessage, setToastMessage] = useState(""); // Mensaje que se muestra en el Toast

  // Función que actualiza el estado del comprador según lo que escribe el usuario
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Solo permitimos números y máximo 15 dígitos
      const numericValue = value.replace(/\D/g, "").slice(0, 15);
      setBuyer({ ...buyer, [name]: numericValue });
    } else {
      setBuyer({ ...buyer, [name]: value });
    }
  };

  // Función que se ejecuta al enviar el formulario
  const finalizarCompra = async (e) => {
    e.preventDefault(); // Evitamos que recargue la página
    setError(""); // Limpiamos errores previos

    // Si el carrito está vacío mostramos toast y volvemos al home
    if (!cart.length) {
      setToastMessage("El carrito está vacío");
      setShowToast(true);
      setTimeout(() => navigate("/"), 2000); // Redirige al home después de 2 segundos
      return;
    }

    // Validaciones básicas de campos obligatorios
    if (
      !buyer.name.trim() ||
      !buyer.lastname.trim() ||
      !buyer.address.trim() ||
      !buyer.phone.trim() ||
      !buyer.email.trim()
    ) {
      return setError("⚠️ Todos los campos son obligatorios.");
    }

    // Validamos que el teléfono tenga mínimo 8 dígitos
    if (buyer.phone.length < 8) {
      return setError("⚠️ Ingrese un teléfono válido (mínimo 8 números).");
    }

    // Validamos que los correos coincidan
    if (buyer.email !== repeatEmail) {
      return setError("⚠️ Los correos no coinciden.");
    }

    // Validación de formato de correo
    if (!/\S+@\S+\.\S+/.test(buyer.email)) {
      return setError("⚠️ Ingrese un correo válido.");
    }

    // Creamos el objeto order que guardaremos en Firestore
    const order = {
      comprador: buyer,
      items: cart,
      total: getCartTotal(),
      date: serverTimestamp(), // Fecha del servidor
    };

    try {
      setLoading(true); // Mostramos que estamos procesando la orden

      // Guardamos la orden en la colección "orders"
      const ventas = collection(db, "orders");
      const res = await addDoc(ventas, order);
      setOrderId(res.id); // Guardamos el id de la orden para mostrarlo

      // Actualizamos el stock de cada producto en Firebase
      for (const item of cart) {
        const docRef = doc(db, "productos", item.id); // Referencia al producto
        const dbDoc = await getDoc(docRef); // Obtenemos los datos actuales
        if (dbDoc.exists()) {
          // Restamos la cantidad comprada y actualizamos
          await updateDoc(docRef, { stock: dbDoc.data().stock - item.quantity });
        }
      }

      clearCart(); // Limpiamos el carrito local
    } catch (err) {
      setToastMessage("Ocurrió un error al generar la orden. Intente nuevamente.");
      setShowToast(true);
    } finally {
      setLoading(false); // Terminó el proceso de carga
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      {/* Toast para mostrar mensajes importantes */}
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        style={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999 }}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>

      {/* Si ya se generó la orden mostramos confirmación */}
      {orderId ? (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">🎉 ¡Compra realizada con éxito!</h2>
          <p className="mb-4">
            Tu número de orden es: <span className="font-mono">{orderId}</span>
          </p>
          <Link className="btn btn-primary" to="/">Seguir comprando</Link>
        </div>
      ) : (
        // Formulario de datos del comprador
        <form onSubmit={finalizarCompra} className="space-y-3">
          <h2 className="text-lg font-semibold mb-3">Completa tus datos</h2>

          <input
            className={`form-control mb-3 ${error && !buyer.name.trim() ? "is-invalid" : ""}`}
            name="name"
            placeholder="Nombre"
            value={buyer.name}
            onChange={handleInputChange}
          />

          <input
            className={`form-control mb-3 ${error && !buyer.lastname.trim() ? "is-invalid" : ""}`}
            name="lastname"
            placeholder="Apellido"
            value={buyer.lastname}
            onChange={handleInputChange}
          />

          <input
            className={`form-control mb-3 ${error && !buyer.address.trim() ? "is-invalid" : ""}`}
            name="address"
            placeholder="Dirección"
            value={buyer.address}
            onChange={handleInputChange}
          />

          <input
            className={`form-control mb-3 ${error && (!buyer.phone.trim() || buyer.phone.length < 8) ? "is-invalid" : ""}`}
            name="phone"
            type="tel"
            placeholder="Teléfono (solo números)"
            value={buyer.phone}
            onChange={handleInputChange}
          />

          <input
            className={`form-control mb-3 ${error && !buyer.email.trim() ? "is-invalid" : ""}`}
            name="email"
            type="email"
            placeholder="Correo electrónico"
            value={buyer.email}
            onChange={handleInputChange}
          />

          <input
            className={`form-control mb-3 ${error && buyer.email !== repeatEmail ? "is-invalid" : ""}`}
            type="email"
            placeholder="Repite tu correo"
            value={repeatEmail}
            onChange={(e) => setRepeatEmail(e.target.value)}
          />

          {/* Mensaje de error */}
          {error && <p className="text-danger mb-3">{error}</p>}

          {/* Botón de enviar */}
          <button
            className="btn btn-success w-full"
            type="submit"
            disabled={loading}
          >
            {loading ? "Procesando..." : "Finalizar compra"}
          </button>
        </form>
      )}
    </div>
  );
};

export default CheckOutForm;
