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
      min-height: 80px;
      height: 100%;
      border-radius: 6px;
    }
  }

  .menuBar {
    &:hover {
      cursor: pointer;
    }
  }
`;
