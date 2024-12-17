import { RootState } from "@/services/store";
import { useSelector } from "react-redux";

const useAuth = () => {
  const authData = useSelector((state: RootState) => state.auth.u_data);
  const isAuthenticated = () => {
    return !!authData?.accessToken;
  };

  return {
    authData,
    isAuth: isAuthenticated(),
  };
};

export default useAuth;
