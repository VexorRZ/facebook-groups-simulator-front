import React from "react";

import {
  Container,
  TopicName,
  CommentWrapper,
  TopbarIconteItem,
  TopbarIconBadge,
  ChatItem,
  Comments,
} from "./styles";

interface ITopicContentProps {
  topicName: string;
  numberOfComments: number | string;
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
        <TopbarIconteItem className="topbarIconItem">
          <ChatItem />
          <TopbarIconBadge className="topbarIconBadge">
            {numberOfComments}{" "}
          </TopbarIconBadge>
          <Comments>comentários</Comments>
        </TopbarIconteItem>
      </CommentWrapper>
    </Container>
  );
};

export default TopicContent;
