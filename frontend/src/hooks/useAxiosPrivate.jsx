import { useEffect } from "react";
import { useCookies } from "react-cookie";

import { nativeApiPrivate } from "../apis/nativeApi";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

//Version of axios where access tokens are sent with the request
const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const [cookies, _] = useCookies(["access_token"]);
  // const { auth } = useAuth();

  useEffect(() => {
    //Adds access token to initial request header
    const requestIntercept = nativeApiPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${cookies.access_token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    //If request fails due to an expired token, automatically refreshes the token and then tries the request again
    const responseIntercept = nativeApiPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return nativeApiPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      nativeApiPrivate.interceptors.response.eject(requestIntercept);
      nativeApiPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [cookies.access_token, refresh]);
  return nativeApiPrivate;
};

export default useAxiosPrivate;
