import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Spinner } from 'reactstrap';
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
    <section style={{ background: '#f8f9fa', minHeight: '100vh', padding: '40px 0' }}>
      <Container>
        <Row className="justify-content-center">
          <Col lg="8">
            <Card className="shadow-lg border-0 mb-5" style={{ borderRadius: '18px', background: '#fff' }}>
              <CardBody className="text-center p-5">
                <h1 className="highlight mb-3" style={{ fontWeight: 700, fontSize: '2.5rem' }}>My Profile</h1>
                <div className="mb-4">
                  <span className="d-inline-block px-4 py-2" style={{ fontSize: '1.2rem', color: 'var(--secondary-color)', fontWeight: 600, background: '#f3f6fa', borderRadius: '8px' }}>{user?.username || user?.name}</span>
                </div>
                <div className="mb-4">
                  <span className="d-inline-block px-4 py-2" style={{ fontSize: '1rem', color: '#555', background: '#f3f6fa', borderRadius: '8px' }}>{user?.email}</span>
                </div>
                <h2 className="featured__tour-title mb-4 mt-5" style={{ fontSize: '2rem' }}>Booked Tours</h2>
                {loading ? (
                  <div className="text-center"><Spinner color="secondary" /></div>
                ) : bookings.length === 0 ? (
                  <p className="text-center" style={{ color: '#888' }}>No tours booked yet.</p>
                ) : (
                  <Row>
                    {bookings.map((booking, idx) => (
                      <Col md="6" className="mb-4" key={idx}>
                        <Card className="shadow-sm border-0 h-100" style={{ borderRadius: '14px', background: '#f9fafb' }}>
                          <CardBody>
                            <CardTitle tag="h5" className="mb-2" style={{ color: 'var(--secondary-color)', fontWeight: 600 }}>{booking.tourName}</CardTitle>
                            <CardText>
                              <span style={{ display: 'block', marginBottom: 6 }}><b>Full Name:</b> {booking.fullName}</span>
                              <span style={{ display: 'block', marginBottom: 6 }}><b>Group Size:</b> {booking.groupSize}</span>
                              <span style={{ display: 'block', marginBottom: 6 }}><b>Phone:</b> {booking.phone}</span>
                              <span style={{ display: 'block', marginBottom: 6 }}><b>Booked At:</b> {new Date(booking.bookAt).toLocaleDateString()}</span>
                            </CardText>
                          </CardBody>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Profile;