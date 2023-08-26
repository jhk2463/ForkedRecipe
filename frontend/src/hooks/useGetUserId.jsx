import useAuth from "../hooks/useAuth";

export const useGetUserId = () => {
  // const { auth } = useAuth();
  // return auth.userId;
  return window.localStorage.getItem("userId");
};
