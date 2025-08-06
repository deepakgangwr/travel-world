import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardImg, CardTitle, CardText, Spinner } from 'reactstrap';
import { AuthContext } from '../context/AuthContext';
import '../styles/Home.css';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const params = new URLSearchParams({
          userEmail: user?.email,
          username: user?.username,
        });
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/booking/user/me?${params.toString()}`, {
          headers: {
            Authorization: user?.token,
          },
        });
        const data = await res.json();
        if (data.success) {
          setBookings(data.data);
        }
      } catch (err) {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchBookings();
  }, [user]);

  return (
    <section>
      <Container>
        <Row className="justify-content-center">
          <Col lg="8">
            <div className="hero__content text-center mb-5">
              <h1 className="highlight">My Profile</h1>
              <div style={{ margin: '1rem auto' }}>
                <img
                  src={require('../assets/images/avatar.jpg')}
                  alt="avatar"
                  style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--secondary-color)' }}
                />
              </div>
              <h3>{user?.username || user?.name}</h3>
              <p>{user?.email}</p>
            </div>
            <h2 className="featured__tour-title mb-4">Booked Tours</h2>
            {loading ? (
              <div className="text-center"><Spinner color="secondary" /></div>
            ) : bookings.length === 0 ? (
              <p className="text-center">No tours booked yet.</p>
            ) : (
              <Row>
                {bookings.map((booking, idx) => (
                  <Col md="6" className="mb-4" key={idx}>
                    <Card className="shadow-sm">
                      <CardImg
                        top
                        width="100%"
                        height="200px"
                        style={{ objectFit: 'cover' }}
                        src={require(`../assets/images/tour-img01.jpg`)} // Placeholder, replace with actual tour image if available
                        alt={booking.tourName}
                      />
                      <CardBody>
                        <CardTitle tag="h5">{booking.tourName}</CardTitle>
                        <CardText>
                          <b>Full Name:</b> {booking.fullName}<br />
                          <b>Group Size:</b> {booking.groupSize}<br />
                          <b>Phone:</b> {booking.phone}<br />
                          <b>Booked At:</b> {new Date(booking.bookAt).toLocaleDateString()}<br />
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Profile;