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
}

const TopicContent = ({
  topicName,
  numberOfComments,
  URlGroup,
}: ITopicContentProps) => {
  return (
    <Container URlGroup={URlGroup}>
      <TopicName>{topicName}</TopicName>
      <CommentWrapper>
        <Comments>comentários: </Comments>
        <NumberOfComments>{numberOfComments} </NumberOfComments>
      </CommentWrapper>
    </Container>
  );
};

export default TopicContent;
