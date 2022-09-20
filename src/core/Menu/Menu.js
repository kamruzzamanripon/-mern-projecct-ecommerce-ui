import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { isAuthenticate, signOut } from "../../auth";
import { itemTotal } from "../cartHelpers";

const Menu = ({history}) => {
    //console.log("history", history)
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand as={Link} to="/">
          Click to Cart
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/shop">Shop</Nav.Link>
            <Nav.Link as={Link} to="/cart">Cart <sup>{itemTotal()}</sup></Nav.Link>

            {isAuthenticate() && isAuthenticate().user.role == 1 && (
              <Nav.Link as={Link} to="/admin/dashboard">Dashboard</Nav.Link>
            )}

            {isAuthenticate() && isAuthenticate().user.role == 0 && (
              <Nav.Link as={Link} to="/admin/dashboard">Dashboard</Nav.Link>
            )}

            {!isAuthenticate() && (
                <>
                <Nav.Link as={Link} to="/signin">Sign In</Nav.Link>
                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                </>
            )}

            {isAuthenticate() && (
                <>
                <Nav.Link as={Link} to="/signin" onClick={()=> {signOut()}}>LogOut</Nav.Link>
                </>
            )}
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Menu;
