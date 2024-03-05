import React from "react";
import ElementsRow from "./listRow";
import { SimilarElement } from "../../app/models/SimilarElement";

const data: SimilarElement = {
  title: "Blue Faux Leather Living Room Sofad",
  price: "$142.00",
  image:
    "https://dev.bazar3d.ir/storage/app/public/product/41xkttar8WL._AC.jpg",
};

const index = () => {
  return (
    <>
      <div className="similar-elements-list">
        <ElementsRow title={data.title} price={data.price} image={data.image} />
        <ElementsRow title={data.title} price={data.price} image={data.image} />
        <ElementsRow title={data.title} price={data.price} image={data.image} />
        <ElementsRow title={data.title} price={data.price} image={data.image} />
      </div>
    </>
  );
};

export default index;
