import NavigationMenu from "./NavigationMenu";
const SideBar = () => {
  return (
    <div className="w-[80px]  p-3 min-h-screen hidden md:block border-r md:hover:w-[280px] transition-all fixed left-0 z-50 backdrop-blur-sm bg-slate-400/75 dark:bg-purple-900/45">
      <div className="flex flex-col  gap-8 h-full  transition-all">
        <p className="text-2xl font-bold">CFW</p>
        <div className="border-b" />
        <NavigationMenu />
      </div>
    </div>
  );
};

export default SideBar;
