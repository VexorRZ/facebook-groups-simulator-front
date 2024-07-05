import styled from "styled-components";

import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
} from "@mui/icons-material";

export const Container = styled.div`
  display: flex;
  gap: 5px;
  button {
    background: transparent;
    border: 1px solid #526173;
    color: #526173;
    border-radius: 3px;
    height: 38px;
    width: 40px;
    &:hover {
      border: #101318;
      color: #101318;
      background: #526173;
      cursor: pointer;
    }
  }
`;

export const StyledBold = styled(FormatBold)``;

export const StyledItalic = styled(FormatItalic)``;

export const StyledUnderlined = styled(FormatUnderlined)``;

export const StyledFormatListBulleted = styled(FormatListBulleted)``;

export const StyledFormatListNumbered = styled(FormatListNumbered)``;
