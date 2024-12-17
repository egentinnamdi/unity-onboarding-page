import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { RouterConstantUtil } from "@/utils/constants/RouterConstantUtils";
import { AuthLayout } from "../layout/AuthLayout";
import { APPNAME } from "@/utils/constants";
import { BaseButton } from "@/components/ui/buttons/BaseButton";
import { useLayoutEffect, useState } from "react";
import { cn, handleReqResErrors } from "@/utils/helpers";
import { AssetsUtils } from "@/utils/AssetsUtils";
import { useMediaQuery } from "react-responsive";
import TopLine from "@/components/pages/auth/topLine";
import { OtpInput } from "@/components/ui/data-inputs/OtpInput";
import { useSelector } from "react-redux";
import { RootState } from "@/services/store";
import { AuthService } from "@/services/api/auth";
import { AppDispatch } from "@/services/store";
import { useDispatch } from "react-redux";
import { updatePwdResetDetails } from "@/services/store/slices/authSlice";

const PasswordResetOtp = () => {
  document.title = `Password Reset Otp | ${APPNAME}`;
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  const [otp, setOtp] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [numberOfInputs] = useState(6);

  const [, setSearchParams] = useSearchParams();

  const [disableInputs] = useState(false);

  const isTablet = useMediaQuery({ query: "(max-width: 1440px)" });

  const pwdResetDetails = useSelector(
    (state: RootState) => state.auth.pwdResetDetails
  );

  async function validateOtp() {
    if (otp.length == numberOfInputs) {
      setIsloading(true);
      try {
        await AuthService.verifyResetPwdOtp({
          email: pwdResetDetails?.email!,
          otp,
        });

        dispatch(updatePwdResetDetails({ otp }));

        navigate(RouterConstantUtil.auth.password_reset);
      } catch (e) {
        handleReqResErrors(e as ICustomError, "", "bottom-center");
      } finally {
        setIsloading(false);
      }
    }
  }

  useLayoutEffect(() => {
    if (pwdResetDetails?.email) {
      setSearchParams((params) => {
        params.set("email", pwdResetDetails?.email);
        return params;
      });
    } else {
      navigate(RouterConstantUtil.auth.forgot_password);
    }
  }, []);

  return (
    <AuthLayout
      sideImageStyles={{
        backgroundSize: "contain",
        // backgroundSize: "55rem 55rem",
        backgroundPositionX: isTablet ? "1rem" : "5rem",
      }}
      sideImg={AssetsUtils.images.enterotpsideImg}
      parentClassname="items-start md:pt-9 overflow-y-hidden"
    >
      <div className="flex  h-auto w-[90%] flex-col lg:max-w-md">
        <div className="flex relative w-full mt-32 mx-auto flex-col items-center lg:w-[80%]">
          <TopLine parentClassname="lg:-top-[10rem]" />{" "}
          <div className="flex items-center justify-center mb-8 bg-[#EAEFF5] w-[90px] h-[90px] rounded-[25px]">
            <img className="w-" src={AssetsUtils.icons.claps} alt="wave" />
          </div>
          <h2 className="mb-4 text-3xl font-poppins font-semibold text-[#E60012]">
            Enter OTP
          </h2>
          <p className="text-[#61677D] text-center text-sm font-poppins">
            Enter the OTP code we just sent <br></br> you on your registered
            Email/Phone number
          </p>
          <div className="w-full mt-8 flex items-center flex-col justify-center">
            <OtpInput
              numberOfInputs={numberOfInputs}
              containerClassname=""
              onChangeText={setOtp}
              otp={otp}
              disableInputs={disableInputs}
              inputClassname={
                "w-[48px] h-[62px] lg:text-lg border border-[#EAEFF5] bg-[#F5F9FE] rounded-[12px]"
              }
            />
            <BaseButton
              hoverOpacity={0.6}
              hoverScale={1}
              isSubmitting={isLoading}
              disabled={isLoading}
              onClick={validateOtp}
              type="submit"
              title={"Submit"}
              containerCLassName="bg-[#E60012] mt-10 rounded-[14px] w-full h-[60px] py-[24px] font-medium font-poppins text-[16px] text-[#fff] shadow-[rgba(230,0,18,0.5)_0px_5px_10px_0px]"
            />
            <p
              className={"text-sm text-center mt-5 font-poppins text-[#3B4054]"}
            >
              Didn't get OTP? {""}
              <Link
                to={RouterConstantUtil.auth.register}
                className={cn(
                  "cursor-pointer text-[#3461FD]"
                  //   logginIn &&
                  //     "text-gray pointer-events-none select-none opacity-[.5]"
                )}
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default PasswordResetOtp;
