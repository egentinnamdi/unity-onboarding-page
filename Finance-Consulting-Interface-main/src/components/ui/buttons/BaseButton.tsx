import React, { MouseEventHandler } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/helpers";

type BaseButtonProps = {
  children?: React.ReactNode;
  containerCLassName?: string;
  contClassName?: string;
  onClick?: MouseEventHandler;
  hoverScale?: number;
  hoverOpacity?: number;
  tapScale?: number;
  background?: string;
  isSubmitting?: boolean;
  disabled?: boolean;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  icon?: any;
  title?: string;
  type?: "button" | "submit" | "reset" | undefined;
};
export const BaseButton = ({
  children,
  containerCLassName,
  contClassName,
  onClick,
  background,
  hoverScale = 1.02,
  hoverOpacity = 0.9,
  isSubmitting,
  icon,
  tapScale = 0.9,
  disabled,
  title,
  type = "submit",
}: BaseButtonProps) => {
  return (
    <motion.button
      whileHover={{
        scale: hoverScale,
        opacity: hoverOpacity,
        transition: { duration: 0.1 },
      }}
      style={{ backgroundColor: `${background}`, opacity: disabled ? 0.3 : 1 }}
      whileTap={{ scale: tapScale, borderRadius: "15px" }}
      className={cn(
        "flex h-[45px] cursor-pointer select-none items-center justify-center rounded-[12px] p-[10px] text-center",
        disabled && "pointer-events-none",
        containerCLassName,
      )}
      onClick={onClick}
      type={type}
    >
      {isSubmitting ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        <div className={cn("gap- flex items-center", contClassName)}>
          {icon}
          {title || children}
        </div>
      )}
    </motion.button>
  );
};
