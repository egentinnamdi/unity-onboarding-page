import { useMediaQuery } from "react-responsive";
import { cn } from "@/utils/helpers";
import { motion } from "framer-motion";
import { CSSProperties } from 'react';

export const AuthLayout = ({
  children,
  parentClassname,
  sideImg,
  sideImageStyles,
}: IChildren & {
  parentClassname?: string;
  authNavParentClassName?: string;
  sideImg?: string;
  sideImageStyles?: CSSProperties
}) => {
  const isTablet = useMediaQuery({ query: "(max-width: 1440px)" });

  return (
    <motion.div
      key="AuthLayout"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.8 }}
      className={cn("flex h-full flex-col lg:fixed lg:inset-0 lg:h-screen")}
    >
      <div className="mb-5 flex h-full overflow-hidden lg:mb-0 lg:h-screen">
        <div
          className={`relative hidden h-full overflow-y-auto bg-white lg:block lg:w-1/2`}
          // style={{ backgroundImage: `url(${sideImg})` }}
        >
          <div
            className="absolute inset-0 overflow-hidden bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${sideImg})`,
              backgroundSize: isTablet ? "contain" : "60rem 60rem",
              backgroundPositionX: isTablet ? "1rem" : "2rem",
              ...sideImageStyles,
            }}
          ></div>
        </div>

        <div
          className={cn(
            "flex min-h-screen w-full lg:items-center justify-center overflow-y-scroll bg-white pt-20 lg:w-1/2",
            parentClassname
          )}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
};
