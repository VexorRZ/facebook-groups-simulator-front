import React from "react";

import { Container, TopicName, NumberOfComments } from "./styles";

interface ITopicContentProps {
  topicName: string;
  numberOfComments: number;
}

const TopicContent = ({ topicName, numberOfComments }: ITopicContentProps) => {
  return (
    <Container>
      <TopicName>{topicName}</TopicName>
      <NumberOfComments>comentários: {numberOfComments}</NumberOfComments>
    </Container>
  );
};

export default TopicContent;
