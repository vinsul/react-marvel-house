import React from "react";

const Pagination = ({ count, limit, setPage, setOffset }) => {
  let buttonsCount = count / limit;

  const rest = count % limit;
  if (rest !== 0) {
    buttonsCount = Math.floor(buttonsCount) + 1;
  }

  const buttons = [];
  for (let i = 1; i <= buttonsCount; i++) {
    const newOffset = (i - 1) * limit;
    if (buttonsCount > 1) {
      buttons.push(
        <button
          key={i}
          onClick={() => {
            setPage(i);
            setOffset(newOffset);
          }}
        >
          {i}
        </button>
      );
    }
  }
  return <span>{buttons}</span>;
};

export default Pagination;
