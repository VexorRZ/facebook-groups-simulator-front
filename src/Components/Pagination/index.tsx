import React from "react";
import { PaginationContainer } from "./styles";

const maxItems = 9;
const maxLeft = (maxItems - 1) / 2;

interface IPaginationProps {
  limit?: any;
  total?: any;
  offset?: any;
  setOffset?: any;
}

const Pagination = ({ limit, total, offset, setOffset }: IPaginationProps) => {
  const currentPage = offset ? offset / limit + 1 : 1;
  const pages = Math.ceil(total / limit);
  const maxFirst = Math.max(pages - (maxItems - 1), 1);
  const first = Math.min(Math.max(currentPage - maxLeft, 1), maxFirst);

  function onPageChange(page: any) {
    setOffset((page - 1) * limit);
  }

  return (
    <PaginationContainer>
      <ul>
        {Array.from({ length: Math.min(maxItems, pages) })
          .map((_, index) => index + first)
          .map((page) => (
            <>
              <li key={page}>
                <button
                  onClick={() => {
                    onPageChange(page);
                  }}
                >
                  {page}
                </button>
              </li>
            </>
          ))}
      </ul>
    </PaginationContainer>
  );
};

export default Pagination;
