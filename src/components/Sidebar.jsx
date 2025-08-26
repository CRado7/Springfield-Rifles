import React from "react";
import { Nav } from "react-bootstrap";

const Sidebar = () => {
  return (
    <div
      className="bg-dark text-white d-flex flex-column p-3 position-fixed top-0 start-0 h-100 shadow-lg"
      style={{
        width: "220px",
        zIndex: 1000,
        background: "linear-gradient(180deg, #0a0a0a, #1a1a1a)",
        borderRight: "3px solid rgb(255, 215, 0)",
        // clipPath: "polygon(0 0, 100% 0, 100% 98%, 0 100%)",
      }}
    >
      <h3
        className="mb-4 text-uppercase fw-bold"
        style={{
          letterSpacing: "2px",
          textShadow: "2px 2px 5px rgba(0,0,0,0.5)",
        }}
      >
        Springfield Rifles
      </h3>

      <Nav className="flex-column">
        {[
          { href: "#top", label: "Top" },
          { href: "#about", label: "About" },
          { href: "#schedule", label: "Schedule" },
          { href: "#faq", label: "FAQ's" },
          { href: "#sponsors", label: "Sponsors" },
          { href: "#contact", label: "Contact" },
        ].map((item) => (
          <Nav.Link
            key={item.href}
            href={item.href}
            className="text-white fw-bold mb-2"
            style={{
              transition: "all 0.3s ease",
              letterSpacing: "1px",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "linear-gradient(45deg, rgb(0, 158, 96), rgb(0, 225, 96))",
              e.target.style.color = "#fff";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "#fff";
              e.target.style.transform = "scale(1)";
            }}
          >
            {item.label}
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;

