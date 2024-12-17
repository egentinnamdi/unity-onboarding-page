import clsx, { ClassArray } from "clsx";
import toast from "react-hot-toast";
import { store } from "@/services/store/index";
import { logout, resetAuthState } from "@/services/store/slices/authSlice";
import { resetUserSlice } from "@/services/store/slices/userSlice";
import { RouterConstantUtil } from "@/utils/constants/RouterConstantUtils";
import { twMerge } from 'node_modules/tailwind-merge/src/lib/tw-merge';

export async function handleLogoutClick() {
  try {
    await toast.promise(
      store.dispatch(logout()).unwrap(),
      {
        loading: "Logging Out...",
        success: "Logout Successful!",
        // error: "Failed to Logout.",
        error: "Signin to proceed",
      },
      {
        id: "logout",
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      },
    );
  } catch (error: any) {
    // console.log("errr:", error);
    if (error?.response?.status == 400 || error?.response?.status == 401) {
      store.dispatch(resetAuthState());
      store.dispatch(resetUserSlice());
      window.location.href = RouterConstantUtil.auth.login;
    }
  } finally {
    store.dispatch(resetAuthState());
    store.dispatch(resetUserSlice());
  }
}

export function handleLoggingOutState(isLoggingOut: boolean) {
  const focusableElements = document.querySelectorAll(
    "a, button, input, textarea, select, details, [tabindex]:not([tabindex='-1'])",
  );

  if (isLoggingOut) {
    document.body.style.overflow = "hidden";
    document.body.style.pointerEvents = "none";
    document.body.style.overflow = "hidden";
    document.body.style.pointerEvents = "none";

    /* eslint-disable @typescript-eslint/no-explicit-any */
    focusableElements.forEach((el: any) => {
      el.setAttribute("data-original-tabindex", el?.getAttribute("tabindex"));
      el.setAttribute("tabindex", "-1");
    });
  } else {
    document.body.style.overflow = "auto";
    document.body.style.pointerEvents = "auto";

    focusableElements.forEach((el) => {
      const originalTabIndex = el.getAttribute("data-original-tabindex");
      if (originalTabIndex) {
        el.setAttribute("tabindex", originalTabIndex);
        el.removeAttribute("data-original-tabindex");
      } else {
        el.removeAttribute("tabindex");
      }
    });
  }
}

export function cn(...inputs: ClassArray) {
  return twMerge(clsx(inputs));
}

export function getUserId() {
  return store.getState()?.auth?.u_data?.user?.id;
}

export const topScroll = (duration: number = 500) => {
  const start = window.pageYOffset;
  const target = 0;
  const startTime = performance.now();

  function step(currentTime: number) {
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    window.scrollTo(0, easeInOutQuad(start, target, progress));

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  function easeInOutQuad(start: number, end: number, progress: number) {
    return start + (end - start) * progress * (3 - 2 * progress);
  }

  requestAnimationFrame(step);
};

export function handleToastNotifs({
  type,
  message,
  id,
  position = "top-center",
  duration,
  dark,
}: handleToastNotifsInterface) {
  (toast as ToastMethod)[type](message, {
    id,
    duration: duration || 10000,
    position: position || "top-right",

    // Styling
    style: dark
      ? {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        }
      : {},
    className: "",

    // Custom Icon
    // icon: "👏",

    // Change colors of success/error/loading icon
    // iconTheme: {
    //   primary: "green",
    //   secondary: "#fff",
    // },

    // Aria
    ariaProps: {
      role: "status",
      "aria-live": "polite",
    },
  });
}

export function handleReqResErrors(e: ICustomError, message?: string, position?: string) {
  handleToastNotifs({
    type: "error",
    position: position || "top-center",
    id: "error",
    message:
      message ||
      e?.response?.data?.message ||
      e?.response?.data?.error ||
      e?.message ||
      "An error occured",
    duration: 4000,
  });
  // if (e?.response?.status == 403) {
  //   store.dispatch(resetAuthState());
  // }
}

