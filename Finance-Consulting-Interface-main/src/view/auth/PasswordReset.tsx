import { useNavigate, useSearchParams } from "react-router-dom";
import { BaseInput } from "@/components/ui/data-inputs/text-input";
import { RouterConstantUtil } from "@/utils/constants/RouterConstantUtils";
import { AuthLayout } from "../layout/AuthLayout";
import { APPNAME } from "@/utils/constants";
import { BaseButton } from "@/components/ui/buttons/BaseButton";
import { useLayoutEffect, useState } from "react";
import { useFormik } from "formik";
import { handleReqResErrors, handleToastNotifs } from "@/utils/helpers";
import { resetPwdSchema } from "@/utils/validationSchemas/authSchema";
import { AssetsUtils } from "@/utils/AssetsUtils";
import { useMediaQuery } from "react-responsive";
import TopLine from "@/components/pages/auth/topLine";
import { useSelector } from "react-redux";
import { RootState } from "@/services/store";
import { AuthService } from "@/services/api/auth";
import { AppDispatch } from "@/services/store";
import { useDispatch } from "react-redux";
import { clearPwdResetDetails } from "@/services/store/slices/authSlice";

const PasswordReset = () => {
  document.title = `Password Reset | ${APPNAME}`;
  const [isLoading, setIsloading] = useState(false);

  const navigate = useNavigate();

  const [, setSearchParams] = useSearchParams();

  const pwdResetDetails = useSelector(
    (state: RootState) => state.auth.pwdResetDetails
  );

  const dispatch: AppDispatch = useDispatch();

  const [initialValues] = useState<Record<string, string>>({
    newPassword: "",
    confirm_password: "",
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: resetPwdSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values, { resetForm }) => {
      setIsloading(true);
      try {
        const { newPassword: password } = values;

        const res = await AuthService.resetPwd({
          password,
          ...pwdResetDetails,
        });

        handleToastNotifs({
          type: "success",
          message: res.data.message || "Success",
          position: "top-right",
          duration: 5000,
        });

        resetForm();
        dispatch(clearPwdResetDetails());
        navigate(RouterConstantUtil.auth.login);
      } catch (e) {
        handleReqResErrors(e as ICustomError);
        navigate(RouterConstantUtil.auth.password_reset_otp);
      } finally {
        setIsloading(false);
      }
    },
  });

  useLayoutEffect(() => {
    if (pwdResetDetails?.email && pwdResetDetails?.otp) {
      setSearchParams((params) => {
        params.set("email", pwdResetDetails?.email);
        params.set("otp", pwdResetDetails?.otp);
        return params;
      });
    } else {
      navigate(RouterConstantUtil.auth.forgot_password);
    }
  }, []);

  const isTablet = useMediaQuery({ query: "(max-width: 1440px)" });

  return (
    <AuthLayout
      sideImageStyles={{
        backgroundSize: "contain",
        // backgroundSize: "55rem 50rem",
        backgroundPositionX: isTablet ? "1rem" : "5rem",
      }}
      sideImg={AssetsUtils.images.resetPwdSideImg}
      parentClassname="items-start md:pt-9 overflow-y-hidden"
    >
      <div className="flex  h-auto w-[90%] flex-col lg:max-w-md">
        <div className="flex relative w-full mt-30 mx-auto flex-col items-center lg:w-[80%]">
          <TopLine parentClassname="lg:-top-[10rem]" />{" "}
          <div className="flex items-center justify-center mb-8 bg-[#EAEFF5] w-[90px] h-[90px] rounded-[25px]">
            <img className="w-" src={AssetsUtils.icons.lock} alt="lock" />
          </div>
          <h2 className="mb-4 text-3xl font-poppins font-semibold text-[#E60012]">
            Reset Password
          </h2>
          <form className="w-full mt-8" onSubmit={formik.handleSubmit}>
            <BaseInput
              inputContainerClassName="bg-[#F5F9FE] border-none  flex pr-5 h-[60px] border-2 text-[#232323] font-gothic-bold text-[16px]"
              inputClassName="border-none pl-5 pr-2 w-full h-full text-black placeholder:text-[#7C8BA0] font-poppins text-md"
              type="password"
              name="newPassword"
              onChange={formik.handleChange}
              error={formik.errors.newPassword}
              value={formik.values.newPassword}
              readOnly={isLoading}
              placeholder="New Password"
            />
            <BaseInput
              inputContainerClassName="bg-[#F5F9FE] mt-4 border-none  flex pr-5 h-[60px] border-2 text-[#232323] font-gothic-bold text-[16px]"
              inputClassName="border-none pl-5 pr-2 w-full h-full text-black placeholder:text-[#7C8BA0] font-poppins text-md"
              type="password"
              name="confirm_password"
              onChange={formik.handleChange}
              error={formik.errors.confirm_password}
              value={formik.values.confirm_password}
              readOnly={isLoading}
              placeholder="Confirm Password"
            />
            <BaseButton
              hoverOpacity={0.9}
              hoverScale={1}
              isSubmitting={isLoading}
              disabled={isLoading}
              containerCLassName="bg-[#E60012] mt-7 rounded-[14px] w-full h-[60px] py-[24px] font-medium font-poppins text-[16px] text-[#fff] shadow-[rgba(230,0,18,0.5)_0px_5px_10px_0px]"
              title={"Reset"}
            />
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default PasswordReset;
