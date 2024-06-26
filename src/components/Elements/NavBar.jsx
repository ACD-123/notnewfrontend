import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

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
            <Link className='nav-link' to="/">Home</Link>
            <Link className='nav-link' to="/top-category">Top Categories</Link>
            <Link className='nav-link' to="/auctions">Auctions</Link>
            <Link className='nav-link' to="/notFound">Hot Deals</Link>
            <Link className='nav-link' to="/notFound">Top Sellers</Link>
            {/* <Nav.Link href="/categorykeyword">Electronics</Nav.Link>
            <Nav.Link href="/categorykeyword">Vintage Products</Nav.Link>
            <Nav.Link href="/categorykeyword">Auto Parts</Nav.Link> */}
            <Link className='nav-link' to="/notFound">Recomendations</Link>
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </>
  )
}

export default NavBar