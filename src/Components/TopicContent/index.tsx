import React from "react";

import {
  Container,
  TopicName,
  NumberOfComments,
  Comments,
  CommentWrapper,
} from "./styles";

interface ITopicContentProps {
  topicName: string;
  numberOfComments: number;
  URlGroup?: boolean;
  onClick?: () => void;
}

const TopicContent = ({
  topicName,
  numberOfComments,
  URlGroup,
  onClick,
}: ITopicContentProps) => {
  return (
    <Container URlGroup={URlGroup} onClick={onClick}>
      <TopicName>{topicName}</TopicName>
      <CommentWrapper>
        <Comments>comentários: </Comments>
        <NumberOfComments>{numberOfComments} </NumberOfComments>
      </CommentWrapper>
    </Container>
  );
};

export default TopicContent;
