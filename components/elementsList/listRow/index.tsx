import React from "react";
import { SimilarElement } from "../../../app/models/SimilarElement";

const index: React.FC<SimilarElement> = ({ title, price, image }) => {
  return (
    <>
      <div className="similar-element">
        <img src={image} alt={title} title={title} />
        <div>
          <div className="title">{title}</div>
          <div className="price">{price}</div>
        </div>
      </div>
    </>
  );
};

export default index;
