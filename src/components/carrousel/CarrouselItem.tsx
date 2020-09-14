import React from "react";
import "./index.css";

function CarrouselItem(props: any) {
  return (
    <div
      className={
        props.isExpanded ? "carrousel-item-expanded" : "carrousel-item"
      }
      onClick={() => props.onClick()}
    >
      <img
        src={`https://picsum.photos/200/300?random=${props.id}`}
        alt=""
        width="200"
        height="300"
      />
    </div>
  );
}

export default CarrouselItem;
