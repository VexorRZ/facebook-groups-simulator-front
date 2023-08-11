import { useContext } from "react";
import GroupContext, {
  type UseGroupContextType,
} from "../Contexts/GroupContext";

const useGroup = (): UseGroupContextType => {
  return useContext(GroupContext);
};

export default useGroup;
