import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 18px;
  width: 300px;
  height: calc(100vh - 50px);
  position: sticky;
  top: 50px;
  scrollbar-width: 10px;
  scrollbar-color: red green;
  ::-webkit-scrollbar {
    width: 30px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const ElementArea = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const GroupsList = styled.div``;
