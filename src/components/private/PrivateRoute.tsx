import SideBar from "../sideBar/SideBar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="h-screen flex xl:w-7xl overflow-x-hidden">
        <SideBar />
        <main className="flex flex-col w-full md:ml-[68px]">
          <Header />
          <div className="  h-auto p-4">{children}</div>
          <Footer />
        </main>
      </div>
    </>
  );
  // ) : (
  //   //passing props state with from as a property and location as a value which is later used in signform.js to access this value
  //   // in order to navigate user to the page when the open in the new tab
  //   <Navigate to="/" state={{ from: { location } }} />
  // );
};
