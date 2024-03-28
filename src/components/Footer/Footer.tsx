import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [limit, setlimit] = useState(0);
  useEffect(() => {
    if (!isInView) return; // If the footer isn't in view, don't do anything
    setlimit((prev) => prev + 10);
  }, [isInView]);

  useEffect(() => {
    navigate(`${location.pathname}?limit=${limit + 10}`);
  }, [limit, navigate, location.pathname]);
  return (
    <footer className=" backdrop-blur-sm border-t-2" ref={ref}>
      <div className="p-3  grid w-full justify-center items-center place-items-center gap-10">
        <div className="flex justify-between  gap-5 flex-col w-full">
          {/* <img src="/logo-light.png" className="h-52 md:h-28 rounded-full" /> */}
          <div className="mt-4 w-full">
            <span className="text-xl text-primary dark:text-purple-500 md:text-4xl font-bold text-center  w-full font-embed ">
              CLASSIC FASHION WEARS
            </span>
          </div>
        </div>
        <div className="text-xl font-embed ">A place for great shopping</div>
        <div>
          <span className="bg-blue-800 text-white font-bold p-4 px-8 rounded-full ">
            Contact us
          </span>
        </div>
        <div>logo</div>

        <div className="  ">@2021 All Rights Reserved</div>
      </div>
    </footer>
  );
};

export default Footer;
