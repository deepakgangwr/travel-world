import React, { useState } from "react";
import { Button, Col } from "reactstrap";
import useFetch from "../../hooks/useFetch";
import BlogCard from "../../Shared/BlogCard";
import "../../Shared/Blogcard.css";


const FeaturedBlogsList = ({ lg, sm, md }) => {
  const { data: featuredBlogs, loading } = useFetch(`blogs/featured`);
  const [page, setPage] = useState(1);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader" />
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  const blogsPerPage = 3;
  const startIndex = (page - 1) * blogsPerPage;
  const currentBlogs = Array.isArray(featuredBlogs)
    ? featuredBlogs.slice(startIndex, startIndex + blogsPerPage)
    : [];

  const totalPages = Math.ceil((featuredBlogs?.length || 0) / blogsPerPage);

  return (
    <>
      {currentBlogs.map((blog) => (
        <Col lg={lg} md={md} sm={sm} className="" key={blog._id}>
          <BlogCard blog={blog} />
        </Col>
      ))}
      <div className="viall__btn d-flex gap-2 mt-3">
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i}
            className={`btn1 ${page === i + 1 ? "active" : ""}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </>
  );
};

export default FeaturedBlogsList;
