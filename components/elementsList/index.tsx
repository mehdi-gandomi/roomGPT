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

const index = (props) => {
  let {items}=props;
  console.log(items)
  return (
    <>
      <div className="similar-elements-list">
        {items && items.length ? items.map((item, index) => (
          <ElementsRow
            key={index}
            title={jsonData[item.product].title}
            price={`$${jsonData[item.product].price / 57000}`}
            image={`https://dev.bazar3d.ir/storage/app/public/product/thumbnail/${jsonData[item.product].img}`}
          />
        )):null}
      </div>
    </>
  );
};

export default index;
