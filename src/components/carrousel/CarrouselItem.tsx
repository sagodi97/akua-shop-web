import React from "react";
import "./index.css";

function CarrouselItem(props: any) {
  return (
    <div className="carrousel-item">
      <img
        src={"https://source.unsplash.com/random/200x300?sig=" + props.id}
        alt=""
      />
    </div>
  );
}

export default CarrouselItem;
