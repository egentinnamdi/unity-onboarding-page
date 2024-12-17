import { CSSProperties, InputHTMLAttributes, useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoMdCheckmarkCircle } from "react-icons/io";import { cn } from "@/utils/helpers";
import { TfiEye } from "react-icons/tfi";
import { PiEyeSlashLight } from "react-icons/pi";

interface BaseInputProps {
  label?: string;
  placeholder?: string;
  containerClassname?: string;
  inputContainerStyle?: CSSProperties;
  type?: string;
  inputContainerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  showValidTick?: boolean;
  title?: string;
  name?: string;
  error?: string;
  errorClassname?: string;
  icon?: string;
  // showEye?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}
export const BaseInput = ({
  label,
  placeholder,
  containerClassname,
  type,
  name,
  inputContainerClassName,
  errorClassname,
  title,
  error,
  inputClassName,
  icon,
  labelClassName,
  // showEye,
  showValidTick,
  readOnly,
  autoFocus,
  onBlur,
  ...props
}: BaseInputProps & InputHTMLAttributes<HTMLInputElement>) => {
  const [showPassword, setShowPassword] = useState(false);
  // const [inputValue, setInputValue] = useState("");
  // const [pwdField, setPwdField] = useState("");

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(e.target.value);
  //   if (type === "password") {
  //     setPwdField(showPassword ? "" : "*".repeat(inputValue.length));
  //   }
  // };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={cn(containerClassname)}>
      {label && (
        <h1
          dangerouslySetInnerHTML={{ __html: label }}
          className={cn(
            "mb-1 text-left text-[28px] font-medium leading-[25px] text-black",
            labelClassName
          )}
        ></h1>
      )}
      {title}
      <div
        style={{ opacity: readOnly ? ".5" : 1 }}
        className={cn(
          "relative flex items-center gap-1 rounded-xl",
          readOnly ? "opacity-[.5]" : "opacity-[1]",
          inputContainerClassName
        )}
      >
        <img src={icon} alt="" />
        <input
          autoFocus={autoFocus}
          onBlur={onBlur}
          autoComplete={type == "password" ? "True" : "false"}
          name={name}
          // {...register(`${name}`)}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          // type={"text"}
          className={cn(
            "text-themeText h-14 w-full rounded-[10px] border bg-transparent py-3 text-left font-poppins text-sm placeholder-gray-400 outline-none placeholder:font-medium placeholder:text-[#606060] focus:outline-none",
            inputClassName
          )}
          // value={type === "password" && !showPassword ? pwdField : inputValue}
          // onChange={handleInputChange}
          placeholder={placeholder}
          readOnly={readOnly}
          {...props}
        />
        {/* {showEye && ( */}
        <div className="">
          {type == "password" &&
            (showPassword ? (
              <PiEyeSlashLight
                onClick={handleTogglePassword}
                className="cursor-pointer text-[25px] text-[#7C8BA0]"
              />
            ) : (
              <TfiEye
                onClick={handleTogglePassword}
                className="cursor-pointer text-[25px] text-[#7C8BA0]"
              />
            ))}
        </div>
        {/* )} */}
        {showValidTick && (
          <IoMdCheckmarkCircle className="ml-3 text-[30px] text-[green]" />
        )}
      </div>
      {error && (
        <p
          className={cn(
            "mb-4 mt-1 flex items-center gap-2 text-sm leading-[15px] text-[red]",
            errorClassname
          )}
        >
          <IoInformationCircleOutline /> {error}
        </p>
      )}
    </div>
  );
};
