import { Link, NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuth } from "../hooks/useAuth";
import Dark from "./Dark";
import { PiStudentBold } from "react-icons/pi";

const Header = () => {
  const { user } = useAuth();
  return (
    <Navbar collapseOnSelect expand="lg" className="header">
      <Container>
        <Link to="/">
          <Navbar.Brand>
            <PiStudentBold />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            {user && (
              <NavLink to="/">
                <Nav.Link as="span">Posts</Nav.Link>
              </NavLink>
            )}
            {user ? (
              <NavLink to="/profile">
                <Nav.Link as="span">Profile</Nav.Link>
              </NavLink>
            ) : (
              <NavLink to="/login">
                <Nav.Link as="span">Login</Nav.Link>
              </NavLink>
            )}
            {/* <NavLink to="/about">
              <Nav.Link as="span">About</Nav.Link>
            </NavLink>
            <NavLink to="/contacts">
              <Nav.Link as="span">Contacts</Nav.Link>
            </NavLink> */}
          </Nav>
          <Dark />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
