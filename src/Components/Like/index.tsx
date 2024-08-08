/* eslint-disable multiline-ternary */
import React, { useState, useEffect } from "react";

import { StyledOutineIcon, StyledOutinefilledIcon } from "./styles";

interface ILikeProps {
  onClickParent: () => void;
  likeAmount: number;
  hasLike?: boolean;
}

const Like = ({ onClickParent, likeAmount, hasLike }: ILikeProps) => {
  const [liked, setLiked] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setClicked(false);
    setLiked(Boolean(hasLike));

    valueAmount();
  }, [hasLike]);

  const updateLike = async () => {
    setLiked(!liked);
  };

  const valueAmount = () => {
    if (hasLike && clicked) {
      return likeAmount - 1;
    } else if (!hasLike && clicked) {
      return likeAmount + 1;
    } else {
      return likeAmount;
    }
  };

  return (
    <div>
      {liked ? (
        <StyledOutinefilledIcon
          onClick={async () => {
            await updateLike();
            onClickParent();
            setClicked(!clicked);
          }}
        />
      ) : (
        <StyledOutineIcon
          onClick={async () => {
            await updateLike();
            onClickParent();
            setClicked(!clicked);
          }}
        />
      )}
      {valueAmount()}
    </div>
  );
};

export default Like;
