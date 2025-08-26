import React from "react";
import { Container, Button } from "react-bootstrap";
import Hero from "../assets/hero2.jpeg";
import Sidebar from "../components/Sidebar";
import ScheduleCalendar from "../components/ScheduleCalendar";
import FAQAccordion from "../components/FAQAccordian";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div style={{ marginLeft: "220px", width: "100%" }}>
        {/* Hero Section */}
        <section
          id="top"
          className="position-relative d-flex align-items-center"
          style={{
            backgroundImage: `url(${Hero})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
            overflow: "hidden",
          }}
        >
          {/* Overlay for contrast */}
          <div className="position-absolute top-0 start-0 w-100 h-100" 
               style={{ background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7))" }}>
          </div>

          {/* Hero Content */}
          <Container
            className="position-relative text-white d-flex flex-column flex-md-row align-items-end pb-5"
            style={{ width: "90%", maxWidth: "1200px", zIndex: 2 }}
          >
            <h1
              className="fw-bold mb-4 mb-md-0 display-1 text-uppercase"
              style={{
                width: "40%",
                letterSpacing: "3px",
                textShadow: "3px 3px 10px rgba(0,0,0,0.7)",
                transform: "skewY(-2deg)",
              }}
            >
              Unite.<br />
              Play.<br />
              Grow. Belong.
            </h1>

            <div
              className="ms-md-4 w-100 w-md-60 d-flex flex-column justify-content-end"
              style={{ animation: "fadeInUp 1s ease forwards" }}
            >
              <p
                className="fs-3 fw-bold mb-4"
                style={{ textShadow: "2px 2px 5px rgba(0,0,0,0.5)" }}
              >
                Experience rugby for all. Discover our teams, view schedules, or get involved—on and off the field.
              </p>
              <Button
                className="btn-lg btn-gradient shadow-lg"
                style={{
                  background: "linear-gradient(45deg, rgb(0, 158, 96), rgb(0, 225, 96))",
                  border: "none",
                  textTransform: "uppercase",
                  fontWeight: "700",
                  letterSpacing: "1px",
                  padding: "1rem 2rem",
                }}
              >
                Join Today
              </Button>
            </div>
          </Container>

          {/* Hero Animation Keyframes */}
          <style>{`
            @keyframes fadeInUp {
              0% { opacity: 0; transform: translateY(30px);}
              100% { opacity: 1; transform: translateY(0);}
            }
          `}</style>
        </section>

        {/* About Section */}
        <section
          id="about"
          style={{
            minHeight: "100vh",
            padding: "80px",
            background: "#111",
            color: "#fff",
            clipPath: "polygon(0 0, 100% 5%, 100% 100%, 0% 95%)"
          }}
        >
          <Container>
            <h2 className="display-4 fw-bold mb-4">About Us</h2>
            <p className="fs-5">
              Springfield Rifles is a dynamic rugby club focused on community, competition, and fun. Join us to experience the energy of rugby firsthand!
            </p>
          </Container>
        </section>

        {/* Schedule Calendar Section */}
        <section id="schedule" style={{ minHeight: "100vh", padding: "80px", background: "#0a0a0a" }}>
          <ScheduleCalendar />
        </section>

        {/* FAQ Section */}
        <section id="faq" style={{ minHeight: "100vh", padding: "80px", background: "#111" }}>
          <FAQAccordion />
        </section>

        {/* Sponsors Section */}
        <section id="sponsors" style={{ minHeight: "100vh", padding: "80px", background: "#0a0a0a", color: "#fff" }}>
          <Container>
            <h2 className="display-4 fw-bold mb-4">Sponsors</h2>
            <p>Our supporters help keep the energy alive!</p>
          </Container>
        </section>

        {/* Contact Section */}
        <section id="contact" style={{ minHeight: "100vh", padding: "80px", background: "#111", color: "#fff" }}>
          <Container>
            <h2 className="display-4 fw-bold mb-4">Contact</h2>
            <p>Get in touch and join the excitement!</p>
          </Container>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
