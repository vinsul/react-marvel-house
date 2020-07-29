import React from "react";

const Pagination = ({ count, limit, setPage, setOffset }) => {
  const buttonsCount = count / limit;

  const buttons = [];
  for (let i = 1; i <= buttonsCount; i++) {
    const newOffset = (i - 1) * limit;
    buttons.push(
      <button
        onClick={() => {
          setPage(i);
          setOffset(newOffset);
        }}
      >
        {i}
      </button>
    );
  }
  return <span>{buttons}</span>;
};

export default Pagination;
