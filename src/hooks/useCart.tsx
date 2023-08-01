import { useContext } from "react";
import CartContext, { type UseCartContextType } from "../Contexts/AuthContext";

const useCart = (): UseCartContextType => {
  return useContext(CartContext);
};

export default useCart;
