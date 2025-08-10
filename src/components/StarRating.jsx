import React from "react";
import "../styles/StarRating.css";

export default function StarRating({ rating }) {
  const count = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <div className="star-rating" aria-label={`Rating: ${count} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`star ${i < count ? "star--filled" : ""}`}>
          ★
        </span>
      ))}
    </div>
  );
}
