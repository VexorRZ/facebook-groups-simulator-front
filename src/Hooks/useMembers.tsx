import { useContext } from "react";
import GroupMemberContext, {
  type UseGroupMembersContextType,
} from "../Contexts/GroupMembersContext";

const useGroupmembers = (): UseGroupMembersContextType => {
  return useContext(GroupMemberContext);
};

export default useGroupmembers;
