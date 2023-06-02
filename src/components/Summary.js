import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Summary = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setShow(data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!show) {
    return <div>Loading...</div>;
  }

  return (
    <div className="summary-page">
      <div className="summary-card">
        <h2 className="summary-heading">{show.name}</h2>
        <div className="summary-data-grid">
          <div style={{ textAlign: "center", margin: "1rem auto" }}>
            <img className="summary-image" src={show.image.medium} alt={show.name} />
          </div>
          <div className="summary-details" dangerouslySetInnerHTML={{ __html: show.summary }} />
        </div>
        <div className="summary-link-box">
          <Link to={`/book/${show.id}`} id="summary-link">
            Book a ticket
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Summary;
