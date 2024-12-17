import { BaseService } from "./axios.interceptor.ts";

export class AuthService {
  static login = (data: ILogin) => {
    return BaseService.appClient(false).post("auth/login", data);
  };

  static registerNewUser = (data: IRegistration) => {
    return BaseService.appClient(false).post(
      `auth/register`,
      data
    );
  };

  static initialiseForgotPassword = (data: { email: string }) => {
    return BaseService.appClient(false).post("auth/forgot-password", data);
  };

  static verifyResetPwdOtp = (data: Record<string, string>) => {
    return BaseService.appClient(false).post("auth/verify-otp", data);
  };

  static resetPwd = (data: Record<string, string>) => {
    return BaseService.appClient(false).post("auth/reset-password", data);
  };

  static logout = () => {
    return BaseService.appClient(true).get("auth/logout");
  };

  // static resendOtp = (path: string) => {
  //   return BaseService.appClient(false).get(path);
  // };
}
