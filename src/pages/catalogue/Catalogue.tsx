import { CustomTabs } from "@/components/Tabs/CustomTabs";
import CategoryForm from "@/components/category/CategoryForm";
import { useAppSelector } from "@/hooks";
import { ICategory } from "@/types";

const CataloguePage = () => {
  const { catalogue } = useAppSelector((store) => store.catagoryInfo);

  return (
    <div className="">
      <CustomTabs
        type="catagory"
        children={
          <div className="w-full flex justify-between gap-2 mt-2">
            <div className="hidden md:block w-1/2 mt-5 rounded-md">
              <img src="/menu.svg" className="h-full w-full object-cover " />
            </div>
            <CategoryForm />
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
