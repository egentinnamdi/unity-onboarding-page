import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { BaseButton } from "@/components/ui/buttons/BaseButton";
import { BaseInput } from "@/components/ui/data-inputs/text-input";
import { APPNAME } from "@/utils/constants";
import { RouterConstantUtil } from "@/utils/constants/RouterConstantUtils";
import { registerSchema } from "@/utils/validationSchemas/authSchema";
import { AuthLayout } from "@/view/layout/AuthLayout";
import { cn, handleReqResErrors, handleToastNotifs } from "@/utils/helpers";
import { AuthService } from "@/services/api/auth";
import { AssetsUtils } from "@/utils/AssetsUtils";
import { IoMdCheckmarkCircle } from "react-icons/io";

const RegistrationView = () => {
  document.title = `Register | ${APPNAME}`;
  const [isLoading, setIsloading] = useState(false);

  const [initialValues] = useState<IRegistration>({
    name: "",
    phone: "",
    email: "",
    password: "",
    agreeTerms: false,
  });

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: registerSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values, { resetForm }) => {
      setIsloading(true);
      try {
        // const data = { ...values, agr: values.ag };
        const { agreeTerms, ...data } = values;
        const res = await AuthService.registerNewUser(data);

        handleToastNotifs({
          type: "success",
          message: res.data.message || "Success",
          position: "top-right",
          duration: 3000,
        });
        resetForm();
        navigate(RouterConstantUtil.auth.login);
      } catch (e) {
        handleReqResErrors(e as ICustomError);
      } finally {
        setIsloading(false);
      }
    },
  });

  return (
    <AuthLayout
      sideImg={AssetsUtils.images.signupSideImg}
      parentClassname={cn("overflow-y-auto max-md:items-start")}
    >
      <div className="flex lg:h-full w-full flex-col lg:max-w-md">
        <div className="mx-auto flex h-[90%] w-[90%] flex-col items-center overflow-y-auto sm:pb-16 lg:w-[80%]">
          <div className="flex items-center justify-center mb-8 bg-[#EAEFF5] w-[90px] h-[90px] rounded-[25px]">
            <img className="w-auto" src={AssetsUtils.icons.wave} alt="wave" />
          </div>
          <h2 className="mb-4 text-3xl font-poppins font-semibold text-[#E60012]">
            Sign Up
          </h2>
          <form
            className="mt-6 w-full space-y-4"
            onSubmit={formik.handleSubmit}
          >
            <BaseInput
              inputContainerClassName="bg-[#F5F9FE] border-none  flex h-[60px] border-2 text-[#232323] font-gothic-bold text-[16px]"
              inputClassName="border-none pl-5 pr-2 w-full h-full text-black placeholder:text-[#7C8BA0] font-poppins text-md"
              name="name"
              onChange={formik.handleChange}
              error={formik.errors.name}
              value={formik.values.name}
              type="text"
              placeholder="Name"
              readOnly={isLoading}
            />
            <BaseInput
              inputContainerClassName="bg-[#F5F9FE] border-none  flex h-[60px] border-2 text-[#232323] font-gothic-bold text-[16px]"
              inputClassName="border-none pl-5 pr-2 w-full h-full text-black placeholder:text-[#7C8BA0] font-poppins text-md"
              placeholder="Email"
              name="email"
              onChange={formik.handleChange}
              error={formik.errors.email}
              value={formik.values.email}
              type="email"
              readOnly={isLoading}
            />
            <BaseInput
              inputContainerClassName="bg-[#F5F9FE] border-none  flex h-[60px] border-2 text-[#232323] font-gothic-bold text-[16px]"
              inputClassName="border-none pl-5 pr-2 w-full h-full text-black placeholder:text-[#7C8BA0] font-poppins text-md"
              placeholder="Phone Number"
              name="phone"
              onChange={formik.handleChange}
              error={formik.errors.phone}
              value={formik.values.phone}
              type="tel"
              readOnly={isLoading}
            />

            <BaseInput
              inputContainerClassName="bg-[#F5F9FE] border-none  flex h-[60px] border-2 text-[#232323] font-gothic-bold text-[16px]"
              inputClassName="border-none pl-5 pr-2 w-full h-full text-black placeholder:text-[#7C8BA0] font-poppins text-md"
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.errors.password}
              placeholder="Password"
              readOnly={isLoading}
            />
            <div
              className={cn(
                "flex flex-col items-start justify-start pt-4",
                isLoading &&
                  "text-gray pointer-events-none select-none opacity-[.5]"
              )}
            >
              <div
                className={"flex flex-row items-start justify-start gap-2 px-2"}
              >
                <input
                  type="checkbox"
                  className="bg-[#F5F9FE] checkbox rounded-[5px] border-none md:h-[18px] md:w-[18px]"
                  id="agreeTerms"
                  checked={formik.values.agreeTerms}
                  name="agreeTerms"
                  onChange={formik.handleChange}
                />
                <label
                  htmlFor="agreeTerms"
                  className="label flex cursor-pointer items-center -mt-2"
                >
                  <span
                    className={"w-full text-xs font-poppins text-[#3B4054]"}
                  >
                    I agree to the
                    <Link
                      to={RouterConstantUtil.page.termsAndConditions}
                      className="ml-1 cursor-pointer underline text-[#3461FD]"
                    >
                      Terms of Service
                    </Link>{" "}
                    and
                    <Link
                      to={RouterConstantUtil.page.privacyPolicy}
                      className="ml-1 cursor-pointer underline text-[#3461FD]"
                    >
                      Privacy<br></br> Policy
                    </Link>
                  </span>
                </label>
              </div>
              {formik.errors.agreeTerms && (
                <p className="flex items-center gap-2 text-sm leading-[15px] text-[red]">
                  <IoMdCheckmarkCircle /> {formik.errors.agreeTerms}
                </p>
              )}
            </div>
            <BaseButton
              hoverOpacity={0.9}
              hoverScale={1}
              isSubmitting={isLoading}
              disabled={isLoading}
              type="submit"
              containerCLassName="bg-[#E60012] mt-10 rounded-[14px] w-full h-[60px] py-[24px] font-medium font-poppins text-[16px] text-[#fff] shadow-[rgba(230,0,18,0.5)_0px_5px_10px_0px]"
              title={"Create Account"}
            />
            <p className={"text-sm text-center font-poppins text-[#3B4054]"}>
              Do you have account?{" "}
              <Link
                to={RouterConstantUtil.auth.login}
                className={cn(
                  "cursor-pointer text-[#3461FD]",
                  isLoading &&
                    "text-gray pointer-events-none select-none opacity-[.5]"
                )}
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegistrationView;
