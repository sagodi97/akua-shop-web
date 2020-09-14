import React, { useState, useEffect, useRef } from "react";
import CarrouselItem from "./CarrouselItem";
import PicsumImage from "./picsum";
import "./index.css";

function Carrousel() {
  const [items, setItems] = useState<PicsumImage[] | undefined>(undefined);
  const viewportDiv = useRef<HTMLDivElement>(null);
  let scroller: any;

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

  const handleHoverOn = (side: "right" | "left") => {
    const node = viewportDiv.current;
    if (node) {
      scroller = setInterval(() => scrollX(side, node), 100);
    }
  };
  const handleHoverOut = (side: "right" | "left") => {
    const node = viewportDiv.current;
    console.log("I'm outta here");
    clearInterval(scroller);
  };

  const scrollX = (direction: "right" | "left", node: HTMLDivElement) => {
    if (direction === "right" && node.scrollLeft !== node.scrollWidth) {
      node.scrollBy({ left: 35, behavior: "auto" });
      console.log(node.scrollLeft);
    } else {
      node.scrollBy({ left: -35, behavior: "auto" });
      console.log(node.scrollLeft);
    }
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
      <div
        className="scrollLeft"
        onMouseOver={() => handleHoverOn("left")}
        onMouseOut={() => handleHoverOut("left")}
      ></div>
      <div className="carrousel-viewport" ref={viewportDiv}>
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
      <div
        className="scrollRight"
        onMouseOver={() => handleHoverOn("right")}
        onMouseOut={() => handleHoverOut("right")}
      ></div>
    </div>
  );
}

export default Carrousel;
