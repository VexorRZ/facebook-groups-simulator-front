import React, { useState, useEffect } from "react";

import { LikeIcon } from "./styles";
import heart from "../../assets/icons/heart.svg";
import heartFilled from "../../assets/icons/heartFilled.svg";

interface ILikeProps {
  onClickParent: () => void;
  likeAmount: number;
  hasLike?: boolean;
  paginationChange: any;
}

const Like = ({ onClickParent, likeAmount, hasLike }: ILikeProps) => {
  const [liked, setLiked] = useState(false);
  const [_likeAMount, setLikeAMount] = useState(0);

  useEffect(() => {
    setLiked(Boolean(hasLike));
  }, [hasLike]);

  const updateLike = async () => {
    setLiked(!liked);
  };

  return (
    <div>
      <LikeIcon
        src={liked ? heartFilled : heart}
        alt=""
        onClick={async () => {
          await updateLike();
          onClickParent();
        }}
      />
      {likeAmount}
    </div>
  );
};

export default Like;
