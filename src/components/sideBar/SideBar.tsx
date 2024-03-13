import NavigationMenu from "./NavigationMenu";
const SideBar = () => {
  return (
    <div
      className={`w-[80px]  px-4  min-h-screen hidden md:block  md:hover:w-[380px] transition-all fixed left-0 z-50 backdrop-blur-sm bg-slate-200 dark:bg-purple-900/45 overflow-y-auto border-r-2 border-r-purple-300`}
    >
      <div className="flex flex-col  gap-8 h-full  transition-all ">
        <p className="text-xs text-center uppercase font-bold  py-5 line-clamp-1  text-purple-700 ">
          Menu
        </p>
        <NavigationMenu />
      </div>
    </div>
  );
};

export default SideBar;
