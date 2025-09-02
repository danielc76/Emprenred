import { useEffect, useState } from "react";   
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";
import LoaderComponent from "./LoaderComponent";
import Toast from "react-bootstrap/Toast";
import { motion } from "framer-motion";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

// Firebase
import { collection, getDocs, query, where, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from "../service/firebase";

// Datos mock (solo para subir si hace falta)
import { products } from "../data/productos";

// CSS
import './css/ItemListContainer.css';

const ItemListContainer = ({ saludo }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [emprendedorData, setEmprendedorData] = useState(null);

  const { category, emprendedor, localidad } = useParams();
  const ModoAdmin = false; // ahora lo dejamos true para mostrar los botones admin

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchProductos = async () => {
      try {
        let productosList = [];

        if (category) {
          const q = query(
            collection(db, "productos"),
            where("categoria", "==", category.toLowerCase())
          );
          const res = await getDocs(q);
          productosList = res.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        } else if (emprendedor) {
          const q = query(
            collection(db, "productos"),
            where("emprendedor", "==", emprendedor)
          );
          const res = await getDocs(q);
          productosList = res.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        } else if (localidad) {
          const qEmp = query(
            collection(db, "emprendedores"),
            where("localidad", "==", localidad)
          );
          const snapshotEmp = await getDocs(qEmp);
          const emprendedoresEnLocalidad = snapshotEmp.docs.map(doc => doc.data().nombreEmprendimiento);

          if (emprendedoresEnLocalidad.length > 0) {
            const collectionProductos = collection(db, "productos");
            const productosSnapshot = await getDocs(collectionProductos);
            productosList = productosSnapshot.docs
              .map(doc => ({ id: doc.id, ...doc.data() }))
              .filter(prod => emprendedoresEnLocalidad.includes(prod.emprendedor));
          } else {
            productosList = [];
          }
        } else {
          const res = await getDocs(collection(db, "productos"));
          productosList = res.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }

        setProductos(productosList);

      } catch (err) {
        console.log(err);
        setError("Ocurrió un error al cargar los productos.");
        setToastMessage("Error cargando productos.");
        setShowToast(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [category, emprendedor, localidad]);

  useEffect(() => {
    if (!emprendedor) {
      setEmprendedorData(null);
      return;
    }
    const fetchEmprendedor = async () => {
      try {
        const q = query(
          collection(db, "emprendedores"),
          where("nombreEmprendimiento", "==", emprendedor)
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setEmprendedorData({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
        } else {
          setEmprendedorData(null);
        }
      } catch {
        setToastMessage("Error cargando datos del emprendedor.");
        setShowToast(true);
      }
    };
    fetchEmprendedor();
  }, [emprendedor]);

  // --- FUNCIONES ADMIN ---
  const subirDataFirebase = async () => {
    try {
      const collectionProductos = collection(db, 'productos');
      for (const prod of products) await addDoc(collectionProductos, prod);
      setToastMessage("Productos subidos correctamente!");
      setShowToast(true);
    } catch {
      setToastMessage("Error al subir productos.");
      setShowToast(true);
    }
  };

  const borrarColeccion = async () => {
    try {
      const collectionRef = collection(db, "productos");
      const snapshot = await getDocs(collectionRef);
      const deletePromises = snapshot.docs.map((documento) =>
        deleteDoc(doc(db, "productos", documento.id))
      );
      await Promise.all(deletePromises);
      setToastMessage("Todos los productos fueron eliminados.");
      setShowToast(true);
      setProductos([]);
    } catch {
      setToastMessage("Error eliminando productos.");
      setShowToast(true);
    }
  };

  const categorias = ["Artesanias", "Tecnologia", "Ropa", "Alimentos", "Deportes"];
  const subirCategoriasFirebase = async () => {
    try {
      const collectionCategorias = collection(db, 'categorias');
      for (const cat of categorias) {
        const q = query(collectionCategorias, where("nombre", "==", cat));
        const snapshot = await getDocs(q);
        if (snapshot.empty) await addDoc(collectionCategorias, { nombre: cat });
      }
      setToastMessage("Categorías subidas correctamente!");
      setShowToast(true);
    } catch {
      setToastMessage("Error al subir categorías.");
      setShowToast(true);
    }
  };

  const subirEmprendedoresFirebase = async () => {
    try {
      const collectionEmprendedores = collection(db, 'emprendedores');
      // subir desde mock si se quiere
    } catch {
      setToastMessage("Error al subir emprendedores.");
      setShowToast(true);
    }
  };

  if (loading) return <LoaderComponent />;
  if (error) return <p className="error">{error}</p>;

  const title = category 
    ? `Categoría: ${category.charAt(0).toUpperCase() + category.slice(1)}`
    : emprendedor 
      ? `Emprendedor: ${emprendedor}`
      : localidad
        ? `Productos de ${localidad}`
        : saludo;

  return (
    <div className="itemlist-container">
      {/* Toast */}
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        className="toast-container"
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>

      {!emprendedorData && <h1 className="saludo">{title}</h1>}

      {/* BOTONES ADMIN */}
      {ModoAdmin && (
        <div className="admin-buttons">
          <button className="admin-btn-subir" onClick={subirDataFirebase}>Subir Productos</button>
          <button className="admin-btn-borrar" onClick={borrarColeccion}>Borrar Productos</button>
          <button className="admin-btn-categorias" onClick={subirCategoriasFirebase}>Subir Categorías</button>
          <button className="admin-btn-emprendedores" onClick={subirEmprendedoresFirebase}>Subir Emprendedores</button>
        </div>
      )}

      {/* Emprendedor Card */}
      {emprendedorData && (
        <motion.div 
          className="emprendedor-card"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
        >
          <img src={`/assets/img/${emprendedorData.foto}`} alt={emprendedorData.nombreEmprendimiento} />
          <div className="emprendedor-datos">
            <h2>{emprendedorData.nombreEmprendimiento}</h2>
            <p className="descripcion">{emprendedorData.descripcion}</p>
            <p><strong>Contacto:</strong> {emprendedorData.nombreContacto}</p>

            <p>
              <strong>Instagram:</strong>{" "}
              {emprendedorData.instagram ? (
                <a 
                  href={`https://www.instagram.com/${emprendedorData.instagram}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="link-instagram"
                >
                  <FaInstagram /> @{emprendedorData.instagram}
                </a>
              ) : "No disponible"}
            </p>

            <p>
              <strong>Teléfono:</strong>{" "}
              {emprendedorData.telefono ? (
                <a 
                  href={`https://wa.me/${emprendedorData.telefono.replace(/\D/g, '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="link-whatsapp"
                >
                  <FaWhatsapp /> {emprendedorData.telefono}
                </a>
              ) : "No disponible"}
            </p>

            {emprendedorData.domicilio && <p><strong>Domicilio:</strong> {emprendedorData.domicilio}</p>}
            <p><strong>Localidad:</strong> {emprendedorData.localidad}</p>
          </div>
        </motion.div>
      )}

      {/* Lista de productos */}
      <div className="products-container">
        {productos.length === 0 ? (
          <p className="no-products">No hay productos en esta categoría/emprendedor/localidad.</p>
        ) : (
          <ItemList data={productos} />
        )}
      </div>
    </div>
  );
};

export default ItemListContainer;
