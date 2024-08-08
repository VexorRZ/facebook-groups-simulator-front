import styled from "styled-components";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const StyledOutineIcon = styled(FavoriteBorderIcon)`
  border: solid 1px #0e1014;

  &:hover {
    cursor: pointer;
  }
`;

export const StyledOutinefilledIcon = styled(FavoriteIcon)`
  color: crimson;

  &:hover {
    cursor: pointer;
  }
`;
