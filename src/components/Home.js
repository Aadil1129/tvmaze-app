import React, { useEffect, useState } from "react";
import axios from "axios";
import QuabdLogo from "../images/quabd-logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, Row, Col } from "react-bootstrap";

function Home() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("https://api.tvmaze.com/search/shows?q=all");
      setShows(result.data);
    };

    fetchData();
  }, []);

  return (
    <div style={{ backgroundColor: "#2c302d" }}>
      <div style={{ textAlign: "center" }}>
        <img src={QuabdLogo} alt="quabd logo" className="main-logo" />
      </div>
      <Container>
        {/* <div className="home-page-title">Watch Your Favourite</div> */}

        <Row>
          {shows.map((show, index) => (
            <Col sm={12} md={3} key={index} style={{ marginTop: "2rem" }}>
              <Card
                style={{
                  width: "14rem",
                  marginBottom: "10px",
                  border: "none",
                  overflow: "hidden",
                }}
              >
                <a href={`/summary/${show.show.id}`} rel="noreferral">
                  <Card.Img
                    id="card-image"
                    variant="top"
                    src={show.show.image ? show.show.image.medium : ""}
                    alt={show.show.name}
                  />
                </a>
              </Card>
              <div className="card-detail">
                <div className="card-name">{show.show.name}</div>
                <div className="card-genres">{show.show.genres.join(", ")}</div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Home;
