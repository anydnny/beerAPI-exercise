import React from "react";
import "../style/dist/Pagination.css";
export default function Pagination(props) {
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(props.beerListLength / props.beerPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }
  return (
    <ul className="pagination">
      {pageNumbers.map((number) => (
        <li
          key={number}
          onClick={() => props.onPageSwap(number)}
          className="pagination__number"
        >
          {number}
        </li>
      ))}
    </ul>
  );
}
