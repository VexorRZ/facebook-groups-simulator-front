import styled from "styled-components";

export const Container = styled.div`
  gap: 5px;
  display: flex;
  flex-direction: column;

  .contentEditor {
    border: white;
    color: black;
    background: white;
    min-height: 80px;
    height: 100%;
    border-radius: 6px;
    .tiptap {
      padding: 8px;
      min-height: 100px;
      height: 100%;
      border-radius: 6px;

      p {
        margin: 0;
      }
    }
  }

  .menuBar {
    &:hover {
      cursor: pointer;
    }
  }
`;
