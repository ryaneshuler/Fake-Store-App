import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';



function NavBar() {
  return (
      <Navbar bg="primary" variant="dark" expand="lg" className="w-100 mb-4">
        <Container fluid className="ps-3">
          <Navbar.Brand href="#home">Fake Store</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/" activeclassname="active">Home</Nav.Link>
          <Nav.Link as={NavLink} to="/productlisting" activeclassname="active">Product Listing</Nav.Link>
          <Nav.Link as={NavLink} to="/addproduct" activeclassname="active">Add Product</Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Container>
    </Navbar>
  );
}

export default NavBar;