import { RouterConstantUtil } from "@/utils/constants/RouterConstantUtils";
import { cn } from "@/utils/helpers";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

const TopLine = ({parentClassname}: {parentClassname?: string}) => {
  const { pathname } = useLocation();

  const linesDetails = [
    {
      route: RouterConstantUtil.auth.forgot_password,
      back: RouterConstantUtil.auth.login,
    },
    {
      route: RouterConstantUtil.auth.password_reset_otp,
      back: RouterConstantUtil.auth.forgot_password,
    },
    {
      route: RouterConstantUtil.auth.password_reset,
      back: RouterConstantUtil.auth.password_reset_otp,
    },
  ];

  return (
    <div
      className={cn(
        "w-[90vw] lg:max-w-[40vw] lg:w-[40vw] absolute -top-[10rem] lg:-top-[16rem] z-[100]  flex items-start flex-col gap-12",
        parentClassname
      )}
    >
      <Link
        to={
          pathname == RouterConstantUtil.auth.forgot_password
            ? RouterConstantUtil.auth.login
            : pathname == RouterConstantUtil.auth.password_reset_otp
            ? RouterConstantUtil.auth.forgot_password
            : RouterConstantUtil.auth.password_reset_otp
        }
      >
        <IoMdArrowBack className="text-black text-3xl" />
      </Link>
      <div className="flex items-center gap-3 mx-auto">
        {linesDetails.map(({ route }, _idx) => (
          <div
          key={_idx}
            className={cn(
              "bg-[#D6DFFF] h-[4px] w-[32px] rounded-[2px]",
              pathname == route && "bg-[#3461FD]"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default TopLine;
