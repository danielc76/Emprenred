import { useEffect, useState } from "react"; 
// el mock lo uso solo para subir los productos 
import { products } from "../data/productos";

import ItemList from "./ItemList";
import { useParams } from "react-router-dom";

import LoaderComponent from "./LoaderComponent"

// Importamos Firebase para manejar la base de datos
import { addDoc, collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore'
import { db } from "../service/firebase"

const ItemListContainer = ({ saludo }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { category } = useParams();

  // FIREBASE  
  useEffect(() => {
    setLoading(true); // Reseteo el loading al iniciar  
    setError(null);

    // si hay categoría => filtramos, sino traemos todo
    const productsCollection = category 
      ? query(collection(db, "productos"), where("categoria", "==", category.toLowerCase())) 
      : collection(db, "productos")

    // pedimos los documentos
    getDocs(productsCollection)
      .then((res) => {
        const list = res.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setProductos(list)
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [category])

  // SUBIR DATA A FIREBASE
  const subirDataFirebase = () => {
    console.log('Click!!!')
    const collectionProductos = collection(db, 'productos')
    products.map((prod) => addDoc(collectionProductos, prod))
  }

  // BORRAR TODO EL CONTENIDO DE LA COLECCION
  const borrarColeccion = async () => {
    try {
      const collectionRef = collection(db, "productos");
      const snapshot = await getDocs(collectionRef);
      const deletePromises = snapshot.docs.map((documento) =>
        deleteDoc(doc(db, "productos", documento.id))
      );
      await Promise.all(deletePromises);
      console.log("Todos los documentos fueron eliminados.");
    } catch (error) {
      console.error("Error eliminando documentos: ", error);
    }
  };

  if (loading) {
    return <LoaderComponent />;
  } else if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  } else {
    let title;
    if (category) {
      title = `Categoría: ${category.charAt(0).toUpperCase() + category.slice(1)}`;
    } else {
      title = saludo;
    }

    let content;
    if (productos.length === 0) {
      content = <p style={{ color: "gray" }}>No hay productos en esta categoría.</p>;
    } else {
      // Le agregamos una clase contenedor para las animaciones de cards
      content = <div className="products-container"><ItemList data={productos} /></div>;
    }

    return (
      <div>
        <h1>{title}</h1>
        <div>
          {/* botones para subir data y borrar coleccion - SOLO ADMIN DEBERIA VER ESTO */}
          <button onClick={subirDataFirebase}>Subir Data</button>
          <button
            onClick={borrarColeccion}
            style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}
          >
            Borrar Todo
          </button>
        </div>
        {content}
      </div>
    );
  }
};

export default ItemListContainer;
