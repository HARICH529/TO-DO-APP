import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTasks } from 'react-icons/fa';

const Header = ({ isLoggedIn }) => {
  return (
    <Navbar expand="lg" style={{ background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }} variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FaTasks className="me-2" />
          Todo App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;