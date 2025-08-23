import ItemCount from "./ItemCount";
import { useContext } from "react";
import { CartContext } from "../context/CartContext"; // Importamos el contexto del carrito

// Muestra toda la información del producto recibido como prop
const ItemDetail = ({ detalle }) => {
    // Traemos la función real para agregar productos desde el contexto
    const { addToCart } = useContext(CartContext);

    // Función que se pasa a ItemCount para agregar productos al carrito
    const onAdd = (cantidad) => {
        // Llamamos a la función del contexto
        addToCart(
            {
                id: detalle.id,
                name: detalle.name,
                price: detalle.precio, // según tu estructura
                img: detalle.foto
            },
            cantidad
        );
    };

    // Evita mostrar contenido si aún no se cargó el producto
    if (!detalle || Object.keys(detalle).length === 0) {
        return <p>Cargando detalle del producto...</p>;
    }

    return (
        <div className="d-flex justify-content-center flex-column align-items-center p-4">
            <h1>{detalle.name}</h1>

            {/* Imagen según el ID del producto */}
            <img
                alt={detalle.name}
                src={`/${detalle.foto}`}
                style={{ width: "300px", objectFit: "cover", marginBottom: "1rem" }}
            />

            {/* Info del producto */}
            <p><strong>Descripción:</strong> {detalle.description}</p>
            <p><strong>Stock:</strong> {detalle.stock} unidades</p>
            <p><strong>Precio:</strong> ${detalle.precio}</p>

            {/* Componente para elegir cantidad y confirmar compra */}
            <ItemCount stock={detalle.stock} onAdd={onAdd} />
        </div>
    );
};

export default ItemDetail;
