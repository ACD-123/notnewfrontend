import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

const NavBar = () => {

  return (
    <>
   
   <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/topcategory">Top Categories</Nav.Link>
            <Nav.Link href="/singlecategory">Auctions</Nav.Link>
            <Nav.Link href="/categorykeyword">Hot Deals</Nav.Link>
            <Nav.Link href="/categorykeyword">Top Sellers</Nav.Link>
            <Nav.Link href="/categorykeyword">Electronics</Nav.Link>
            <Nav.Link href="/categorykeyword">Vintage Products</Nav.Link>
            <Nav.Link href="/categorykeyword">Auto Parts</Nav.Link>
            <Nav.Link href="/categorykeyword">Recomendations</Nav.Link>
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </>
  )
}

export default NavBar