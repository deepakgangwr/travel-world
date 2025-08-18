import React, { useState, useContext } from "react";
import "./Booking.css";
import { Form, FormGroup, ListGroup, Button, ListGroupItem, Alert } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";
// Razorpay checkout script will be loaded dynamically

const Booking = ({ tour, avgRating, totalRating, reviews }) => {
  const { price, title } = tour;
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user && user.username,
    userEmail: user && user.email,
    tourName: title,
    fullName: "",
    phone: "",
    bookAt: "",
    groupSize: "",
    image:null,
  });

  const [isBookingSuccessful, setIsBookingSuccessful] = useState(false);
  const [isBookingFailed, setIsBookingFailed] = useState(false);
  const [isLoginAlertVisible, setIsLoginAlertVisible] = useState(false);

  const handleChange = async (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-checkout-js")) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.id = "razorpay-checkout-js";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (!user) {
        setIsLoginAlertVisible(true);
        return;
      }

      const groupSizeNumber = Number(booking.groupSize || 1);
      const taxes = 0.05 * Number(price) * groupSizeNumber;
      const totalAmount = Number(price) * groupSizeNumber + taxes;
      const amountPaise = Math.round(totalAmount * 100);

      const orderRes = await fetch(`${BASE_URL}/payments/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          amount: amountPaise,
          currency: "INR",
          notes: { tourName: title, userEmail: user?.email }
        })
      });

      if (!orderRes.ok) {
        setIsBookingSuccessful(false);
        setIsBookingFailed(true);
        return;
      }
      const { order } = await orderRes.json();

      const loaded = await loadRazorpayScript();
      if (!loaded) {
        setIsBookingSuccessful(false);
        setIsBookingFailed(true);
        return;
      }

      // get public key from backend
      const keyRes = await fetch(`${BASE_URL}/payments/key`, { credentials: "include" });
      const keyJson = keyRes.ok ? await keyRes.json() : { key: undefined };
      const options = {
        key: keyJson?.key,
        amount: order.amount,
        currency: order.currency,
        name: "Tour Booking",
        description: title,
        order_id: order.id,
        prefill: {
          name: booking.fullName,
          email: user?.email,
          contact: booking.phone,
        },
        notes: {
          tourName: title,
          userEmail: user?.email,
        },
        handler: async function (response) {
          try {
            const verifyRes = await fetch(`${BASE_URL}/payments/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                booking: {
                  ...booking,
                  userId: user && user.username,
                  userEmail: user && user.email,
                  tourName: title,
                  amount: amountPaise,
                  currency: "INR",
                }
              })
            });

            if (verifyRes.ok) {
              setIsBookingSuccessful(true);
              setIsBookingFailed(false);
              setBooking({
                ...booking,
                fullName: "",
                phone: "",
                bookAt: "",
                groupSize: "",
                image: "",
              });
              setTimeout(() => {
                navigate("/thank-you");
              }, 800);
            } else {
              setIsBookingSuccessful(false);
              setIsBookingFailed(true);
            }
          } catch (err) {
            setIsBookingSuccessful(false);
            setIsBookingFailed(true);
          }
        },
        theme: { color: "#3399cc" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", function () {
        setIsBookingSuccessful(false);
        setIsBookingFailed(true);
      });
      razorpay.open();
    } catch (error) {
      setIsBookingSuccessful(false);
      setIsBookingFailed(true);
    }
  };

  // Get the current date in YYYY-MM-DD format
  const currentDate = new Date().toISOString().split("T")[0];

  const taxes = (0.05 * price * (booking.groupSize || 1)).toFixed(2);
  const total = (price * (booking.groupSize || 1) * 1.05).toFixed(2);

  return (
    <div className="booking">
      {isBookingSuccessful && (
        <Alert color="success">
          Booking Successful
        </Alert>
      )}

      {isBookingFailed && (
        <Alert color="danger">
          Failed to book. Please try again.
        </Alert>
      )}

      {isLoginAlertVisible && (
        <Alert color="warning">
          Please login to proceed with the booking.
        </Alert>
      )}

      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ₹{price} <span>/Per Person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center gap-1">
          <i className="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating}
          {totalRating === 0 ? (
            <span>Not Rated</span>
          ) : (
            <span>({reviews.length || 0})</span>
          )}
        </span>
      </div>

      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form">
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
              value={booking.fullName}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
              value={booking.phone}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder="Date"
              id="bookAt"
              required
              onChange={handleChange}
              value={booking.bookAt}
              min={currentDate} // Set min attribute to current date
            />
            <input
              type="number"
              placeholder="Group Size"
              id="groupSize"
              required
              onChange={handleChange}
              value={booking.groupSize}
            />
          </FormGroup>
        </Form>
      </div>

      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
               ₹{price} <i className="ri-close-line"></i>
              {booking.groupSize || 1} Person
            </h5>
            <span>  ₹{price * (booking.groupSize || 1)}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Taxes</h5>
            <span>  ₹{taxes}</span>
          </ListGroupItem>

          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>  ₹{total}</span>
          </ListGroupItem>
        </ListGroup>
        <Button type="button" className="btn primary__btn w-100 mt-4" onClick={handleClick}>
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default Booking;
