import { useContext } from "react";
import GroupContext, {
  type UseGroupContextType,
} from "../Contexts/GroupContext";

const useGroups = (): UseGroupContextType => {
  return useContext(GroupContext);
};

export default useGroups;
