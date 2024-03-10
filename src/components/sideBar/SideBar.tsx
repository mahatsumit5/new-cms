import NavigationMenu from "./NavigationMenu";
const SideBar = () => {
  return (
    <div
      className={`w-[75px]  px-4  min-h-screen hidden md:block border-r md:hover:w-[280px] transition-all fixed left-0 z-50 backdrop-blur-sm bg-slate-200 dark:bg-purple-900/45 overflow-y-auto`}
    >
      <div className="flex flex-col  gap-8 h-full  transition-all ">
        <p className="text-xs text-center uppercase font-bold  py-5 line-clamp-1  ">
          classic fashion wears
        </p>
        <NavigationMenu />
      </div>
    </div>
  );
};

export default SideBar;
