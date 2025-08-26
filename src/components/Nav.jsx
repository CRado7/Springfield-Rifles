import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../styles/NavBar.css";

const NavBar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`transition-navbar ${show ? "show" : "hide"}`}
      style={{
        transition: "top 0.3s ease, background-color 0.3s ease",
        background: "linear-gradient(to left, #111, rgba(17,17,17,0) 40%)",
        borderBottom: "4px solid transparent",
        borderImage: "linear-gradient(to left, rgb(255, 215, 0), rgba(255, 215, 0, 0) 45%) 1",
      }}
    >
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-2 border-warning" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto fw-bold">
            {["about", "schedule", "sponsors", "faq", "contact"].map((section) => (
              <Nav.Link
                key={section}
                href={`#${section}`}
                className="text-white mx-2 px-3 py-2 rounded hover-glow"
                style={{ transition: "all 0.2s ease-in-out" }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
