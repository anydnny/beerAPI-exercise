import React from "react";
import "../style/dist/ItemCard.css";

export default function ItemCard(props) {
  return (
    <>
      <div className="background" onClick={(e) => props.onCloseCard(e)}>
        <article className="itemCard">
          <header className="itemCard__header">
            <button
              className="itemCard__close"
              onClick={(e) => props.onCloseCard(e)}
            >
              x
            </button>
          </header>
          <main>
            <img
              className="itemCard__img"
              src={props.beer.image_url}
              alt="beer"
            />
            <section className="itemCard__info">
              <header className="info__header">
                <h2>
                  {props.beer.name} <span>{props.beer.abv}abv</span>
                </h2>
                <span>{props.beer.tagline}</span>
              </header>
              <main className="info__main">
                <p>{props.beer.description}</p>
                <ul>
                  {props.beer?.food_pairing?.map((pair) => (
                    <li key={pair}>{pair}</li>
                  ))}
                </ul>
              </main>
            </section>
          </main>
        </article>
      </div>
    </>
  );
}
