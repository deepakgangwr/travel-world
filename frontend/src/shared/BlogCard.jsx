import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import "./Blogcard.css";

const BlogCard = ({ blog }) => {
  const { _id, title, author, date, photo, comments, featured } = blog;

  return (
    <div className="blog__card">
      <Card className="blog__card__wrapper">
        <Link to={`/blogs/${_id}`}>
          <div className="blog__img">
            <img src={photo || blog.image} alt="blog" />
            {featured && <span className="featured__label">Featured</span>}
          </div>
        </Link>
        <CardBody className="blog__card__body">
          <div className="blog__meta d-flex justify-content-between align-items-center">
            <div className="blog__author d-flex align-items-center">
              <i className="ri-user-line"></i>
              <span>{author}</span>
            </div>
            <div className="blog__date">
              <span>{new Date(date).toLocaleDateString()}</span>
            </div>
          </div>
          <h5 className="blog__title">
            <Link to={`/blogs/${_id}`}>{title}</Link>
          </h5>
          <div className="blog__footer d-flex justify-content-between align-items-center mt-3">
            <div className="blog__comments">
              <span>{comments ? comments.length : 0} Comments</span>
            </div>
            <Link to={`/blogs/${_id}`} className="btn readmore__btn">
              Read More
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default BlogCard;
