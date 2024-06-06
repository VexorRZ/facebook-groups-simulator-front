import React, { useEffect, useState } from "react";
import GroupCard from "../../Containers/GroupCard";
import TopBar from "../../Components/TopBar";
import SideMenu from "../../Components/SideMenu";
import useAuth from "../../Hooks/useAuth";
import useGroups from "../../Hooks/useGroups";
import { type Groups } from "../../Contexts/GroupContext/interfaces";

import { GroupCardList, Container } from "./styles";

const UserGroups = () => {
  const [loadedGroups, setGroups] = useState<Groups[]>([]);

  const { userData } = useAuth();
  const { asyncGetGroupsByMember, dispatch, groupData } = useGroups();

  // useEffect(() => {
  //   // asyncGetGroupsByMember(dispatch);
  //   console.log(groupData, "groups na página de grupos");
  //   //@ts-ignore
  //   setGroups(groupData);

  //   console.log("groupdata on usergroups", groupData);
  // }, []);

  return (
    <Container>
      <TopBar />

      <GroupCardList>
        {loadedGroups.map((group, index) => {
          return (
            <GroupCard
              onClickView={() => {}}
              onClickEnter={() => {}}
              key={index}
              groupOwner={group.administrator.name}
              groupName={group.name}
              groupStatus={group.is_private ? `${`Privado`}` : `${`Público`}`}
              numberOfMbembers={group.members.length}
              statusColor={group.is_private ? `${`red`}` : `${`green`}`}
              numberOfTopics={group.topics.length}
              groupImage={group.avatar.path}
              CardButtonTextView="Ver Grupo"
              ButtonViewGroupVisible={true}
              marginLeft="0"
            />
          );
        })}
      </GroupCardList>
    </Container>
  );
};

export default UserGroups;
