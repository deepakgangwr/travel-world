import React, { useState, useContext } from "react";
import { Container, Form, FormGroup, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../context/AuthContext";

const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    photo: "",
    featured: false,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in to add a blog.");
      return;
    }

    // Attach the logged-in user's username as the author.
    const blogData = { ...formData, author: user.username };

    try {
      const response = await axios.post(`${BASE_URL}/blogs`, blogData, {
        withCredentials: true, // if you need to pass cookies
      });
      setSuccess("Blog created successfully!");
      setTimeout(() => {
        navigate("/blogs"); // Redirect to the blogs page after success
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create blog.");
    }
  };

  return (
    <Container className="mt-4">
      <h2>Add a New Blog</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <textarea
            name="content"
            placeholder="Blog Content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="5"
          />
        </FormGroup>
        <FormGroup>
          <input
            type="text"
            name="photo"
            placeholder="Photo URL"
            value={formData.photo}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup check>
          <label>
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
            />
            {"  "}
            Featured
          </label>
        </FormGroup>
        <Button type="submit" className="btn primary__btn mt-3">
          Add Blog
        </Button>
      </Form>
    </Container>
  );
};

export default AddBlog;
