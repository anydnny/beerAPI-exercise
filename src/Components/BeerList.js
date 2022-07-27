import React from "react";
import BeerCard from "./BeerCard.js";
import "../style/dist/BeerList.css";

export default function BeerList(props) {
  if (props.switchList) {
    return (
      <ul className="beer-list-container">
        {props.beerFilteredData?.map((beer) => (
          <BeerCard beer={beer} key={beer.id} onShowCard={props.onShowCard} />
        ))}
      </ul>
    );
  }
  return (
    <ul className="beer-list-container">
      {props.beerData?.map((beer) => (
        <BeerCard beer={beer} key={beer.id} onShowCard={props.onShowCard} />
      ))}
    </ul>
  );
}

