import React from "react";
import Topic from "../../Components/TopicContent";
import { useParams } from "react-router-dom";

import { Container, GroupImage, GroupTitle } from "./styles";

const Group = () => {
  const params = useParams();

  const { id } = params;
  return (
    <Container>
      <GroupImage />
      <GroupTitle>id do grupo {id}</GroupTitle>
      <Topic topicName="teste" numberOfComments={1} />
    </Container>
  );
};

export default Group;
