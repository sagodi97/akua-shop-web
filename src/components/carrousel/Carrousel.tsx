import React from "react";
import CarrouselItem from "./CarrouselItem";
import "./index.css";

function Carrousel() {
  const items: JSX.Element[] = [];
  for (let index = 0; index < 10; index++) {
    let key = Math.floor(Math.random() * (index * 1000));
    console.log(key);

    items.push(<CarrouselItem key={key} id={key} />);
  }
  return <div className="carrousel-viewport">{items}</div>;
}

export default Carrousel;
