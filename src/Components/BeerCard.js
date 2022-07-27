import React from "react";
import "../style/dist/BeerCard.css";

export default function BeerCard(props) {
  let desc = props.beer.description.split("");
  if (desc.length > 140) {
    desc = desc.slice(0, 137).join("") + "...";
  } else {
    desc = desc.join("");
  }
  return (
    <li className="beer-card" onClick={() => props.onShowCard(props.beer)}>
      <img src={props.beer.image_url} className="ber-card-img" alt="beer" />
      <div className="beer-card__info">
        <h2>{props.beer.name}</h2>
        <p>{desc}</p>
      </div>
    </li>
  );
}
