import React from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import Menu from "../Menu/Menu";

const Layout = ({ 
    title="title",
    description="this is description",
    children,
    className
}) => {
  return (
    <div>
        <Menu />
      <Container>
        <Row>
          <Col md={12}>
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/images/banner-2.jpg"
                  alt="First slide"
                  height="400px"
                />
                <Carousel.Caption>
                  <h2>{title}</h2>
                  <p>
                    {description}
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/images/banner-1.jpg"
                  alt="Second slide"
                  height="400px"
                />

                <Carousel.Caption>
                    <h2>{title}</h2>
                  <p>
                    {description}
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/images/banner-2.jpg"
                  alt="Third slide"
                  height="400px"
                />

                <Carousel.Caption>
                <h2>{title}</h2>
                  <p>
                    {description}
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
      
      <div className={className}>
        {children}
      </div>

    </div>
  );
};

export default Layout;
