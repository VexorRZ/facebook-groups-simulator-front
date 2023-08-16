import { useContext } from "react";
import TopicContext, {
  type UseTopicContextType,
} from "../Contexts/TopicContext";

const useTopic = (): UseTopicContextType => {
  return useContext(TopicContext);
};

export default useTopic;
