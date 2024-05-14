import { RootState } from "../store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import { AppDispatch } from "../store";
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch = () => useDispatch<AppDispatch>();

// TypedUseSelectorHook가 하는 역할
// interface Obj<T> {
//     name: T;
// }

// interface State {
//     state: {
//         data: string;
//         loading: boolean;
//     };
// }

// const Obj: Obj<State> = {
//     name: {
//         state: {
//             data: "abcd",
//             loading: false,
//         },
//     },
// };
