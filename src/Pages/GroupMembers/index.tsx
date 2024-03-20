import React, { useEffect } from "react";
import useGroup from "../../Hooks/useGroups";
import { useParams } from "react-router-dom";
// import { Container } from './styles';

const params = useParams();

const { group_id } = params;

const { asyncGetGroupMembers } = useGroup();

const GroupMembers = () => {
  useEffect(() => {
    const data = asyncGetGroupMembers(Number(group_id));
    console.log(data);
  }, []);

  return <div />;
};

export default GroupMembers;
