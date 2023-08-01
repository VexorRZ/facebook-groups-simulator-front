// import React, {
//   useMemo,
//   useReducer,
//   createContext,
//   type ReactElement,
// } from "react";

// const REDUCER_ACTION_TYPE = {
//   ADD: "ADD",
//   REMOVE: "REMOVE",
//   QUANTITY: "QUANTITY",
//   SUBMIT: "SUBMIT",
// };

// const initCartState: CartStateType = { cart: [] };

// export interface CartItemType {
//   email: string;
//   password: string;
// }

// interface CartStateType {
//   cart: CartItemType[];
// }
// export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

// export interface ReducerAction {
//   type: string;
//   payload?: CartItemType;
// }

// const reducer = (
//   state: CartStateType,
//   action: ReducerAction
// ): CartStateType => {
//   switch (action.type) {
//     case REDUCER_ACTION_TYPE.ADD: {
//       if (action.payload == null) {
//         throw new Error("action.payload missing in ADD action");
//       }

//       const { email, password } = action.payload;

//       return { ...state, cart: [{ email, password }] };
//     }

//     default:
//       throw new Error("Unidentified reducer action type");
//   }
// };

// const useCartContext = (initCartState: CartStateType) => {
//   const [state, dispatch] = useReducer(reducer, initCartState);

//   const REDUCER_ACTIONS = useMemo(() => {
//     return REDUCER_ACTION_TYPE;
//   }, []);

//   // const totalItems = state.cart.reduce((previousValue, cartItem) => {
//   //   return previousValue + cartItem.qty;
//   // }, 0);

//   return { dispatch, REDUCER_ACTIONS };
// };

// export type UseCartContextType = ReturnType<typeof useCartContext>;

// const initCartContextState: UseCartContextType = {
//   dispatch: () => {},
//   REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
// };

// const CartContext = createContext<UseCartContextType>(initCartContextState);

// interface ChildrenType {
//   children?: ReactElement | ReactElement[];
// }

// export const CartProvider = ({ children }: ChildrenType): ReactElement => {
//   return (
//     <CartContext.Provider value={useCartContext(initCartState)}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export default CartContext;
