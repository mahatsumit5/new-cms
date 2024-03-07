import ThemeToggle from "../ThemeToggle/ThemeToggle";
import MobileSideBar from "../sideBar/MobileSideBar";
import hamburger from "/Hamburger.svg";
const Header = () => {
  return (
    <div className="sticky top-0 w-full h-[25vh] p-4 shadow-lg dark:shadow-black z-10 bg-white/0 backdrop-blur-xl">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div className="block md:hidden">
            <MobileSideBar>
              <img alt="burger menu" src={hamburger} className="mt-1" />
            </MobileSideBar>
          </div>
          <div>Logo</div>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            className="bg-slate-300 p- w-60 px-2 placeholder:text-gray-600 rounded-sm dark:bg-slate-600 dark:text-white dark:placeholder:text-white"
            placeholder="Search..."
          />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
