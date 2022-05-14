import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Row } from "react-bootstrap";
const NavBar = () => {
  return (
    <Container fluid>
      <Row>
        <Navbar bg="white" expand="lg">
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>{" "}
              <Nav.Link as={Link} to="/vehiclemake">
                VehicleMake
              </Nav.Link>{" "}
              <Nav.Link as={Link} to="/vehiclemodel">
                VehicleModel
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Row>
    </Container>
  );
};
export default NavBar;
