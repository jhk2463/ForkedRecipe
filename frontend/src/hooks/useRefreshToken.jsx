import nativeApi from "../apis/nativeApi";
import useAuth from "./useAuth";
import { useCookies } from "react-cookie";

//Gets a new access token from the backend using a refresh token
const useRefreshToken = () => {
  // const { setAuth } = useAuth();
  const [_, setCookies] = useCookies(["access_token"]);

  const refresh = async () => {
    const response = await nativeApi.get("/token", {
      withCredentials: true,
    });
    // setAuth((prev) => {
    //   console.log(JSON.stringify(prev));
    //   console.log(response.data.accessToken);
    //   return { ...prev, accessToken: response.data.accessToken };
    // });
    setCookies("access_token", response.data.accessToken);
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
