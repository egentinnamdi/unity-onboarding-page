import { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Preloader from "@/components/ui/preloader";
import { RootState } from "@/services/store";
import { AuthNavigator } from "@/router/components/AuthNavigator";
import NotFound from "@/view/NotFound";
import { allRoutes } from "./routes";
import { ScrollToTop, ScrollToTopBtn } from "@/components/ui/ScrollToTop";
import { useSelector } from "react-redux";
import { handleLoggingOutState } from "@/utils/helpers";
// import useAuth from "@/components/hooks/useAuth";
// import { UserService } from "@/services/api/users";
// import useSWR from "swr";
// import { useDispatch } from "react-redux";
// import { updateUserData } from "@/services/store/slices/authSlice";

export const Router = () => {
  const isLoggingOut = useSelector((state: RootState) => state.auth.logginOut);

  // const { isAuth } = useAuth();

  // const fetcher = (url: string) => UserService.getUserDetails(url);

  // const { data: userData } = useSWR(isAuth ? "users" : null, fetcher);

  // const dispatch: AppDispatch = useDispatch();

  // useEffect(() => {
  //   if (userData?.data?.user) {
  //     dispatch(updateUserData(userData.data.user));
  //   }
  // }, [userData, dispatch]);

  useEffect(() => {
    handleLoggingOutState(isLoggingOut);
  }, [isLoggingOut]);

  return (
    <>
      <div>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <ScrollToTop />
          <ScrollToTopBtn />

          <Suspense fallback={<Preloader />}>
            <Routes>
              <Route path={"*"} element={<NotFound />} />
              {allRoutes.map((item, index) => {
                const Element = item!.component;
                return (
                  <Route
                    key={index}
                    path={item.path}
                    element={
                      <AuthNavigator
                        isAuth={item.meta.isAuth}
                        path={item.path}
                        elem={<Element />}
                      />
                    }
                  />
                );
              })}
            </Routes>
          </Suspense>
          <Toaster containerStyle={{ zIndex: "1000000000000000000" }} />
        </BrowserRouter>
      </div>
    </>
  );
};
