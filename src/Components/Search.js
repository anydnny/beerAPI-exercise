import React from "react";
import "../style/dist/Search.css";

export default function Search(props) {
  return (
    <>
      <header className="header">
        <h1>Beer Catalog</h1>
        <form onSubmit={(e) => props.onSearch(e)} className="header__form">
          <input
            type="text"
            value={props.beerSearchValue}
            onChange={(e) => props.onSearchValueChange(e)}
            placeholder="Lager"
          />
          <input type="submit" value="search" />
          <button onClick={(e) => props.onClearSearch(e)}>clear text</button>
        </form>
      </header>
    </>
  );
}
