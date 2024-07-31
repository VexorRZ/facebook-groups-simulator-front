import React, { useState, useEffect } from "react";

import { LikeIcon } from "./styles";
import heart from "../../assets/icons/heart.svg";
import heartFilled from "../../assets/icons/heartFilled.svg";

interface ILikeProps {
  onClickParent: () => void;
  likeAmount: number;
  hasLike?: boolean;
}

const Like = ({ onClickParent, likeAmount, hasLike }: ILikeProps) => {
  const [liked, setLiked] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [_likeAMount, setLikeAMount] = useState(0);

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
      <LikeIcon
        src={liked ? heartFilled : heart}
        alt=""
        onClick={async () => {
          await updateLike();
          onClickParent();
          setClicked(!clicked);
        }}
      />
      {valueAmount()}
    </div>
  );
};

export default Like;
