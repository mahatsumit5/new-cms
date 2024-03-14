const Footer = () => {
  return (
    <footer className="  dark:bg-black/20 backdrop-blur-sm border-t-2">
      <div className="p-3  grid w-full justify-center items-center place-items-center gap-10">
        <div className="flex justify-between  gap-5 flex-col w-full">
          {/* <img src="/logo-light.png" className="h-52 md:h-28 rounded-full" /> */}
          <div className="mt-4 w-full">
            <span className="text-4xl font-bold text-center  w-full">
              CLASSIC FASHION WEARS
            </span>
          </div>
        </div>
        <div className="text-2xl ">A place for great shopping</div>
        <div>
          <span className="bg-blue-500 p-5 rounded-full text-white">
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
