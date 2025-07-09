import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CartWidget from './CartWidget.jsx';


function NavBar() {
  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            src="loguito.gif"
            alt="Logo Emprenred"
            height="40"
            className="d-inline-block align-top me-2"
          />
          Emprenred
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="my-navbar">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#Ofertas">Ofertas</Nav.Link>
            <Nav.Link href="#Lanzamientos">Lanzamientos</Nav.Link>
            <Nav.Link href="#Categorias">Categorías</Nav.Link>
            <NavDropdown title="" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#artesanias">Artesanías</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#tecnologia">Tecnología</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#ropa">Ropa</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <div className="ms-3">
            <CartWidget />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;