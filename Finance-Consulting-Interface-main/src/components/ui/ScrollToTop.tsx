import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { cn, topScroll } from "@/utils/helpers";
import { AssetsUtils } from "@/utils/AssetsUtils";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    topScroll();
  }, [pathname]);

  return null;
}

export const ScrollToTopBtn = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollPosition > pageHeight * 0.15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { pathname } = useLocation();

  return (
    <div
      className={cn(
        pathname.includes("admin") && "hidden",
        pathname.includes("auth") && "hidden",
        pathname == "/" && "hidden",
      )}
    >
      <button
        onClick={() => topScroll()}
        title="Scroll to top "
        className={cn(
          "fixed bottom-4 right-4 z-[10000] hidden rounded-full text-white transition-all duration-300 ease-in-out hover:scale-110 hover:text-gray-200",
          isScrolled && "block",
        )}
      >
        <img
          src={AssetsUtils.images.top}
          className="h-10 w-10 rounded-full bg-white"
          alt=""
        />
      </button>
    </div>
  );
};
