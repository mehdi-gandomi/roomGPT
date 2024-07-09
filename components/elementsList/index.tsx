// @ts-nocheck
import React from "react";
import ElementsRow from "./listRow";
import { SimilarElement } from "../../app/models/SimilarElement";
import jsonData from "../../app/data/new.json";

const data: SimilarElement = {
  title: "Blue Faux Leather Living Room Sofad",
  price: "$142.00",
  image:
    "https://bazar360.net/storage/app/public/product/41xkttar8WL._AC.jpg",
};

const index = (props) => {
  let {items}=props;
  console.log(items)
  return (
    <>
      <div className="similar-elements-list">
        {items && items.length ? items.map((item, index) => (
          <a target="_blank" title={item.object} key={index} href={`https://bazar360.net/product/${item.address}`}>
            <ElementsRow
            
            title={jsonData[item.address].name}
            price={`$${jsonData[item.address].purchase_price / 57000}`}
            image={`https://bazar360.net/storage/app/public/product/thumbnail/${jsonData[item.address].img}`}
          />
          </a>
        )):null}
      </div>
    </>
  );
};

export default index;
