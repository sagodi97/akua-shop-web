import React, { useState, useEffect, useRef } from "react";
import CarrouselItem from "./CarrouselItem";
import PicsumImage from "./picsum";
import "./index.css";

function Carrousel() {
  const [items, setItems] = useState<PicsumImage[] | undefined>(undefined);

  const handleItemClick = (id: string) => {
    setItems((prev) => {
      //Initialize new state
      let newState: PicsumImage[] = [];
      if (prev) {
        //Find index of clicked item
        const i = prev.findIndex((element) => element.id === id);
        //Store its original isExpanded value
        const clickedItemIsExpanded = prev[i].isExpanded;
        //Set false for isExpanded on all items but flip isExpanded on clicked item
        newState = prev.map((item, index) => {
          return {
            ...item,
            ...{ isExpanded: index === i ? !clickedItemIsExpanded : false },
          };
        });
      }
      return newState;
    });
  };

  useEffect(() => {
    fetch("https://picsum.photos/v2/list?limit=16")
      .then((res) => res.json())
      .then((data: PicsumImage[]) => {
        const list = data.map((img) => ({ ...img, ...{ isExpanded: false } }));
        setItems(list);
      });
  }, []);

  return (
    <div className="carrousel">
      <div className="carrousel-viewport">
        {items?.map((img) => (
          <CarrouselItem
            key={img.id}
            id={img.id}
            src={img.download_url}
            isExpanded={img.isExpanded}
            onClick={() => {
              handleItemClick(img.id);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Carrousel;
