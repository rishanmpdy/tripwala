import { Link } from "react-router-dom";

import "./ResortCard.css";

const ResortCard = ({ resort }) => {

  const [
    mainImage,
    ...thumbnails
  ] = resort.images;

  return (
    <article className="resort-card">

      {/* Main image */}

      <div className="resort-main-image">

        <img
          src={mainImage}
          alt={resort.name}
        />

      </div>


      {/* Thumbnail strip */}

      <div className="resort-thumbnails">

        {thumbnails.slice(0, 5).map(
          (image, index) => (

            <img
              key={`${image}-${index}`}
              src={image}
              alt=""
            />

          )
        )}

      </div>


      {/* Meta */}

      <div className="resort-meta">

        <span className="resort-badge">
          {resort.badge}
        </span>


        <div className="resort-stats">

          <span className="resort-like">
            ❤️ {resort.likes}
          </span>

          <span>
            ◯ {resort.comments}
          </span>

        </div>

      </div>


      {/* Description */}

      <div className="resort-details">

        <div className="resort-description">
          {resort.description}
        </div>

        <Link
          to={`/resort/${resort.id}`}
          className="resort-details-button"
        >
          Details
        </Link>

        <div className="resort-location">
          {resort.location}
        </div>

      </div>

    </article>
  );
};

export default ResortCard;