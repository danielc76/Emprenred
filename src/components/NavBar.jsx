import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import CartWidgetRIcons from './CartWidgetRIcons';

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      {/* Container con maxWidth y margin auto para centrar */}
      <Container style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Navbar.Brand as={NavLink} to="/">
          <img
            src="/loguito.gif"
            alt="logo"
            style={{ width: '6rem' }}  // un poco más pequeño
          />
          <span className="ms-2 fw-bold">Emprenred</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Inicio
            </Nav.Link>

            <NavDropdown title="Categorías" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/categories/artesanias">
                Artesanías
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to="/categories/tecnologia">
                Tecnología
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to="/categories/ropa">
                Ropa
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to="/categories/alimentos">
                Alimentos
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to="/categories/deportes">
                Deportes
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <CartWidgetRIcons />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
