import { CustomTabs } from "@/components/Tabs/CustomTabs";
import AddCategoryForm from "@/components/category/AddCategoryForm";
import { useAppSelector } from "@/hooks";
import { ICategory } from "@/types";

const CataloguePage = () => {
  const { catalogue } = useAppSelector((store) => store.catagoryInfo);

  return (
    <div className="">
      <CustomTabs
        type="catagory"
        children={
          <div className="w-full flex justify-between gap-2 mt-10">
            <div className="hidden md:block w-1/2 mt-5 rounded-md">
              <img src="/menu.svg" className="h-full w-full object-cover " />
            </div>
            <AddCategoryForm />
          </div>
        }
        tab1="Catagory details"
        data={catalogue as ICategory[]}
        tab2="Add new Catagory"
      />
    </div>
  );
};

export default CataloguePage;
