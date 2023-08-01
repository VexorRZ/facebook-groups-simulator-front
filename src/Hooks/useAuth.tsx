import { useContext } from "react";
import AuthContext, { type UseAuthContextType } from "../Contexts/AuthContext";

const useAuth = (): UseAuthContextType => {
  return useContext(AuthContext);
};

export default useAuth;
