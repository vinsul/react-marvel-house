import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleLeft,
  faAngleRight,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";

const Pagination = ({ count, limit, page, setPage, setOffset }) => {
  let buttonsCount = count / limit;
  const numberOfPagesDisplayed = 10;

  const rest = count % limit;
  if (rest !== 0) {
    buttonsCount = Math.floor(buttonsCount) + 1;
  }

  const firstPage = () => {
    setPage(1);
  };

  const nextPages = () => {
    if (page + numberOfPagesDisplayed <= buttonsCount) {
      page += numberOfPagesDisplayed;
      setPage(page);
      setOffset((page - 1) * limit);
    }
  };

  const previousPages = () => {
    if (page - numberOfPagesDisplayed >= 0) {
      page -= numberOfPagesDisplayed;
      setPage(page);
      setOffset((page - 1) * limit);
    }
  };

  const lastPage = () => {
    setPage(buttonsCount);
  };

  const buttons = [];
  for (let i = page; i < page + numberOfPagesDisplayed; i++) {
    const newOffset = (i - 1) * limit;
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

  if (buttonsCount > 1) {
    return (
      <>
        <FontAwesomeIcon icon={faAngleDoubleLeft} onClick={firstPage} />
        <FontAwesomeIcon icon={faAngleLeft} onClick={previousPages} />
        <span>{buttons}</span>
        <FontAwesomeIcon icon={faAngleRight} onClick={nextPages} />
        <FontAwesomeIcon icon={faAngleDoubleRight} onClick={lastPage} />
      </>
    );
  } else return null;
};

// const Pagination = ({ count, limit, setPage, setOffset }) => {
//   let buttonsCount = count / limit;

//   const rest = count % limit;
//   if (rest !== 0) {
//     buttonsCount = Math.floor(buttonsCount) + 1;
//   }

//   const buttons = [];
//   for (let i = 1; i <= buttonsCount; i++) {
//     const newOffset = (i - 1) * limit;
//     if (buttonsCount > 1) {
//       buttons.push(
//         <button
//           key={i}
//           onClick={() => {
//             setPage(i);
//             setOffset(newOffset);
//           }}
//         >
//           {i}
//         </button>
//       );
//     }
//   }
//   return <span>{buttons}</span>;
// };

export default Pagination;
