import { getUserId } from "@/utils/helpers.ts";
import { BaseService } from "./axios.interceptor.ts";

export class UserService {
  static getAllUsers = (url: string) => {
    return BaseService.appClient(true).get(url);
  };

  static getUserDetails = (url: string) => {
    return BaseService.appClient(true).get(`${url}/${getUserId()}`);
  };

  static updateUser = (data: updatedDataType) => {
    return BaseService.appClient(true).put(`/users/${getUserId()}`, data);
  };

  static markSupplierVerifiedOrNot = (
    verify: boolean,
    userId: string | number
  ) => {
    // console.log({userId, verify})
    return BaseService.appClient(true).put(
      `/users/${verify ? "verify-supplier" : "unverify-supplier"}/${userId}`
    );
  };

  static deleteOrDeactivateUser = (data: IDelDeac) => {
    const { userId, actionType: aT } = data;

    if (aT == "del") {
      return BaseService.appClient(true).delete(`users/${userId}`);
    } else if (aT == "deac") {
      return BaseService.appClient(true).get(`users/${userId}/deactivate`);
    } else if (aT == "acti") {
      return BaseService.appClient(true).get(`users/${userId}/activate`);
    }
  };

}
