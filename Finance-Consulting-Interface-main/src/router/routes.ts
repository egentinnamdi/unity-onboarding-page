import { lazy } from "react";
import { RouterConstantUtil } from "@/utils/constants/RouterConstantUtils";
const LoginView = lazy(() => import("@/view/auth/LoginView"));
const RegistrationView = lazy(() => import("@/view/auth/RegistrationView"));
const ForgotPasswordView = lazy(() => import("@/view/auth/ForgotPassword"));
const PasswordResetOtp = lazy(() => import("@/view/auth/PasswordResetOtp"));
const PasswordReset = lazy(() => import("@/view/auth/PasswordReset"));

type RouteMeta = {
  isAuth: boolean;
  redirectTo?: string;
  roles?: string[];
};

/* eslint-disable @typescript-eslint/no-explicit-any */
interface IRouteConfig {
  component: any;
  path: string;
  meta: RouteMeta;
}

export const allRoutes: IRouteConfig[] = [
  {
    component: LoginView,
    path: RouterConstantUtil.auth.login,
    meta: {
      isAuth: false,
      redirectTo: undefined,
    },
  },
  {
    component: RegistrationView,
    path: RouterConstantUtil.auth.register,
    meta: {
      isAuth: false,
      redirectTo: undefined,
    },
  },
  {
    component: ForgotPasswordView,
    path: RouterConstantUtil.auth.forgot_password,
    meta: {
      isAuth: false,
      redirectTo: undefined,
    },
  },
  {
    component: PasswordResetOtp,
    path: RouterConstantUtil.auth.password_reset_otp,
    meta: {
      isAuth: false,
      redirectTo: undefined,
    },
  },
  {
    component: PasswordReset,
    path: RouterConstantUtil.auth.password_reset,
    meta: {
      isAuth: false,
      redirectTo: undefined,
    },
  },
  {
    component: LoginView,
    path: RouterConstantUtil.page.home_page,
    meta: {
      isAuth: false,
      redirectTo: undefined,
    },
  },
];
