import React from "react";
import { Link } from "react-router-dom";
import "./Item.css"; // animación + estilos de la card

const Item = ({ prod, index = 0 }) => {
  if (!prod) return null; // seguridad por si algo viene indefinido

  return (
    <div className="product-card" style={{ animationDelay: `${index * 0.1}s` }}>
      {/* Imagen del producto */}
      <img
        className="product-img"
        src={prod.foto ? `/${prod.foto}` : "/assets/img/placeholder.jpg"}
        alt={prod.name || "Producto"}
      />

      {/* Info del producto */}
      <h5 className="product-title">{prod.name || "Sin nombre"}</h5>
      <p className="product-price">${prod.precio ?? "0"}</p>

      {/* Link a detalle */}
      <Link className="btn btn-primary" to={`/item/${prod.id || "#"}`}>
        Ver detalle
      </Link>
    </div>
  );
};

export default Item;
