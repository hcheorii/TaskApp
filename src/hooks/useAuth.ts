import { useTypedSelector } from "./redux";

export function useAuth() {
    const { id, email } = useTypedSelector((state) => state.user);

    return {
        isAuth: !!email, //로그인이 되어있는지 (있으면 true값)
        email,
        id,
    };
}
