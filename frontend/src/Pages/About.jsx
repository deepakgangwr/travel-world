import React from "react";
import { Container, Row, Col } from "reactstrap";
import Subtitle from "../Shared/Subtitle";
import "../styles/About.css";
import worldImg from "../assets/images/world.png";
import logo1 from "../assets/images/logo1.png";
import Newsletter from "../Shared/Newsletter";
import Contact from "./Contact";

const About = () => {
  return (
    <>
      <section className="about">
        <Container>
          <Row className="align-items-center">
            <Col lg="6" md="12">
              <div className="about__content">
                <div className="hero__subtitle d-flex align-items-center mb-3">
                  <Subtitle subtitle={"About Us"} />
                  <img src={worldImg} alt="world" className="ms-2" />
                </div>
                <h2 className="about__heading">
                  Discover the World with <span className="highlight">Travel World</span>
                </h2>
                <p className="about__description">
                  At Travel World, we open the doors to unforgettable experiences. We’re more than just a travel agency—we’re your partner in exploring the beauty, culture, and thrill the world has to offer.
                </p>
                <p className="about__description">
                  From curated tours to customized adventures, we make traveling easier, safer, and more exciting. With just a few clicks, you can book your dream destination directly from our website.
                </p>
              </div>
            </Col>
            <Col lg="6" md="12" className="text-center">
              <div className="about__image">
                <img src={logo1} alt="Travel Logo" height={280} width={280} />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="about__services">
        <Container>
          <Row>
            <Col lg="12">
              <h2 className="about__heading text-center">What We Offer</h2>
            </Col>

            <Col lg="4" md="6" className="mb-4">
              <div className="service__box">
                <h5>✨ Easy Tour Bookings</h5>
                <p>Plan and book your tour hassle-free through our user-friendly platform. Filter by destination, price, and theme—your perfect trip is just a click away.</p>
              </div>
            </Col>

            <Col lg="4" md="6" className="mb-4">
              <div className="service__box">
                <h5>📝 Write & Read Blogs</h5>
                <p>Become part of our global travel community—read travel blogs, share your own stories, tips, and experiences with fellow explorers.</p>
              </div>
            </Col>

            <Col lg="4" md="6" className="mb-4">
              <div className="service__box">
                <h5>💬 24/7 Customer Support</h5>
                <p>We’re here for you—before, during, and after your journey. Get help, suggestions, or emergency support anytime you need it.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="about__why">
        <Container>
          <Row>
            <Col lg="12">
              <h2 className="about__heading text-center">Why Choose Travel World?</h2>
            </Col>
            <Col lg="6">
              <ul className="why__list">
                <li>🌍 Carefully curated and verified destinations</li>
                <li>🏕️ Experiences tailored to your taste—adventure, luxury, budget</li>
                <li>📱 Fully responsive and modern web experience</li>
                <li>🚀 Fast, secure, and reliable bookings</li>
              </ul>
            </Col>
            <Col lg="6">
              <ul className="why__list">
                <li>🧳 Options for solo travelers, couples, families, and groups</li>
                <li>💡 Travel tips, blogs, and guides from real users</li>
                <li>🏆 Trusted by thousands of travelers globally</li>
                <li>🤝 Community-driven, feedback-focused platform</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="about__community">
        <Container>
          <Row>
            <Col lg="12">
              <h2 className="about__heading text-center">Join Our Travel Community</h2>
              <p className="about__description text-center">
                Connect with passionate travelers, share your journeys, get inspired by travel blogs, and be the first to know about our latest packages, discounts, and experiences. Whether you're a casual tourist or an adventurous globetrotter—we welcome you!
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <Contact />
      <Newsletter />
    </>
  );
};

export default About;
