import React from "react";
import TopBar from "../../Components/TopBar";
import SideMenu from "../../Components/SideMenu";
import GroupCard from "../../Components/GroupCard";

import { Content, Container, GroupCardList } from "./styles";

const Dashboard: React.FC = () => {
  return (
    <Container>
      <TopBar />
      <Content>
        <SideMenu />
        <GroupCardList>
          <GroupCard />
          <GroupCard />
          <GroupCard />
        </GroupCardList>
      </Content>
    </Container>
  );
};

export default Dashboard;
