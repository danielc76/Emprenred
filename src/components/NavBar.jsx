import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useLocation } from 'react-router-dom';
import CartWidgetRIcons from './CartWidgetRIcons';

// Firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "../service/firebase";
import './css/NavBar.css';

function NavBar() {
  const [categorias, setCategorias] = useState([]);
  const [emprendedores, setEmprendedores] = useState([]);
  const [localidades, setLocalidades] = useState([]);

  // Para detectar la ruta actual y aplicar estilo activo al logo
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Cargar categorías desde colección "categorias"
        const categoriasSnap = await getDocs(collection(db, "categorias"));
        const cats = categoriasSnap.docs
          .map(doc => doc.data().nombre?.trim())
          .filter(Boolean);
        setCategorias([...new Set(cats)]);

        // Cargar emprendedores desde colección "emprendedores"
        const emprendedoresSnap = await getDocs(collection(db, "emprendedores"));
        const listEmp = emprendedoresSnap.docs.map(doc => doc.data().nombreEmprendimiento);
        setEmprendedores(listEmp);

        const locs = emprendedoresSnap.docs
          .map(doc => doc.data().localidad?.trim())
          .filter(Boolean);
        setLocalidades([...new Set(locs)]);

      } catch (err) {
        console.log("Error cargando datos para el NavBar:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <Navbar expand="lg" className="navbar-custom fixed-top">
      <Container style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Logo + nombre */}
        <Navbar.Brand
          as={NavLink}
          to="/"
          className={location.pathname === "/" ? "active" : ""}
        >
          <img src="/loguito.gif" alt="logo" className="navbar-logo" />
          <span className="navbar-title ms-2">EmprenRed</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Tienda */}
            <Nav.Link
              as={NavLink}
              to="/tienda"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Tienda
            </Nav.Link>

            {/* Menú Categorías */}
            <NavDropdown title="Categorías" id="nav-categorias">
              {categorias.map((cat, i) => (
                <NavDropdown.Item
                  key={i}
                  as={NavLink}
                  to={`/categories/${encodeURIComponent(cat.toLowerCase())}`}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {cat}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            {/* Menú Emprendedores */}
            <NavDropdown title="Emprendedores" id="nav-emprendedores">
              {emprendedores.map((emp, i) => (
                <NavDropdown.Item
                  key={i}
                  as={NavLink}
                  to={`/emprendedor/${encodeURIComponent(emp)}`}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {emp}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            {/* Menú Ubicación */}
            <NavDropdown title="Ubicación" id="nav-localidades">
              {localidades.map((loc, i) => (
                <NavDropdown.Item
                  key={i}
                  as={NavLink}
                  to={`/localidad/${encodeURIComponent(loc)}`}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {loc}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>

          {/* Widget carrito */}
          <CartWidgetRIcons />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
