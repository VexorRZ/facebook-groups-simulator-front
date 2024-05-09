import { useContext } from "react";
import GroupMemberContext, {
  type UseGroupMembersContextType,
} from "../Contexts/GroupContentContext";

const useGroupContext = (): UseGroupMembersContextType => {
  return useContext(GroupMemberContext);
};

export default useGroupContext;
