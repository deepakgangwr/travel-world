import React, { useState, useEffect } from "react";
import CommonSection from "../shared/CommonSection";
import "../styles/Tour.css";
import tourData from "../assets/data/tours";
import TourCard from "./../shared/TourCard";
import SearchBar from "../shared/SearchBar";
import Newsletter from "../shared/Newsletter";
import { Container, Row, Col } from "reactstrap";

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const pages = Math.ceil(5 / 4);
    setPageCount(pages);
  }, [page]);

  return (
    <div>
      <CommonSection title={"All Tours"} />
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          <Row>
            {tourData?.map((tour) => (
              <Col lg="3" md="6" sm="6" className="mb-4" key={tour.id}>
                <TourCard tour={tour} />
              </Col>
            ))}
            <Col lg="12">
              <div className="pagination d-flex  mt-4 gap-4 justify-content-center">
                {[...Array(pageCount).keys()].map((number) => (
                  <span key={number} onClick={() => setPage(number)}
                  className={page=== number ? "active__page" :" "} 
                  >
                    {number + 1}
                  </span>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </div>
  );
};

export default Tours;
