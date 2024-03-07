// @ts-nocheck
import React from "react";
import ElementsRow from "./listRow";
import { SimilarElement } from "../../app/models/SimilarElement";
import jsonData from "../../app/data/new.json";

const data: SimilarElement = {
  title: "Blue Faux Leather Living Room Sofad",
  price: "$142.00",
  image:
    "https://dev.bazar3d.ir/storage/app/public/product/41xkttar8WL._AC.jpg",
};

const index = () => {
  let codes = ["B0C14PB83M", "B0C1RZB614"];

  return (
    <>
      <div className="similar-elements-list">
        {codes.map((item, index) => (
          <ElementsRow
            key={index}
            title={jsonData[item].title}
            price={`$${jsonData[item].price / 57000}`}
            image={`https://dev.bazar3d.ir/storage/app/public/product/thumbnail/${jsonData[item].img}`}
          />
        ))}
      </div>
    </>
  );
};

export default index;
