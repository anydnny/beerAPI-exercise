import React, { useState, useLayoutEffect, useEffect } from "react";
import BeerList from "./Components/BeerList.js";
import Pagination from "./Components/Pagination.js";
import Search from "./Components/Search.js";
import ItemCard from "./Components/ItemCard.js";

export default function App() {
  const [beerData, setBeerData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [beerPerPage, setBeerPerPage] = useState(5);

  const [beerSearchValue, setBeerSearchValue] = useState("");
  const [beerFilteredData, setBeerFilteredData] = useState([]);
  const [switchList, setSwitchList] = useState(false);

  const [cardClick, setCardClick] = useState(false);
  const [showCard, setShowCard] = useState({});

  const body = document.querySelector("html");

  useLayoutEffect(() => {
    (async () => {
      setLoader(true);
      try {
        const response = await fetch("https://api.punkapi.com/v2/beers");
        const data = await response.json();
        if (!data) {
          return null;
        }
        setBeerData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoader(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (beerSearchValue.length === 0) {
      setSwitchList(false);
      setBeerFilteredData();
      setBeerSearchValue("");
    }
  }, [beerSearchValue]);

  useEffect(() => {
    if (cardClick) {
      body.style.overflow = "hidden";
    }
  }, [cardClick]);

  const lastPageIndex = currentPage * beerPerPage;
  const firstPageIndex = lastPageIndex - beerPerPage;
  const currentBeerPage = beerData.slice(firstPageIndex, lastPageIndex);

  const handlePageSwap = (pageNumber) => setCurrentPage(pageNumber);

  function handleSearchValueChange(e) {
    setBeerSearchValue(e.target.value);
  }
  function handleSearch(e) {
    e.preventDefault();
    if (beerSearchValue) {
      setSwitchList(true);
      setBeerFilteredData(
        beerData.filter((beer) =>
          beer.name
            .toLowerCase()
            .split(" ")
            .join("")
            .includes(beerSearchValue.toLowerCase().split(" ").join(""))
        )
      );
    }
  }
  function handleClearSearch(e) {
    e.preventDefault();
    setSwitchList(false);
    setBeerFilteredData();
    setBeerSearchValue("");
  }

  if (!beerData) {
    return null;
  }

  function handleShowCard(beer) {
    setShowCard(beer);
    setCardClick(true);
  }
  function handleCloseCard(e) {
    if (
      e.target.classList.contains("background") ||
      e.target.closest(".itemCard__close")
    ) {
      setShowCard();
      setCardClick(false);
      body.style.overflow = "auto";
    }
  }
  return (
    <>
      <div className="body">
        {loader ? <p className="loader">Загрузка...</p> : null}
        {switchList && beerFilteredData.length === 0? <p className="loader">Товар не найден</p> : null}
        <Search
          className="search"
          onClearSearch={handleClearSearch}
          onSearch={handleSearch}
          beerSearchValue={beerSearchValue}
          onSearchValueChange={handleSearchValueChange}
        />
        <BeerList
          beerData={currentBeerPage}
          className="beer-list"
          switchList={switchList}
          beerFilteredData={beerFilteredData}
          onShowCard={handleShowCard}
        />
        <Pagination
          beerListLength={
            switchList ? beerFilteredData.length : beerData.length
          }
          beerPerPage={beerPerPage}
          onPageSwap={handlePageSwap}
          className="pagination"
        />
        {beerData && cardClick && (
          <ItemCard beer={showCard} onCloseCard={handleCloseCard} />
        )}
      </div>
    </>
  );
}
