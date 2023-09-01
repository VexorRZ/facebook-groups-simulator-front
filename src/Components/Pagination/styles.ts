import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;

  ul {
    display: flex;
    list-style: none;
    li + li {
      margin-left: 1rem;
    }
    li {
      :hover {
        cursor: pointer;
      }
    }
  }
`;

export const paginationItemActive = styled.div`
  background: none;
  font-weight: bold;
  border: none;
`;

export const paginationItemActiveFocus = styled.div`
  outline: none;
`;
