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
          <div className="w-full md:w-[400px] mx-auto  bg-white/70 rounded-lg p-3 dark:bg-black/35 my-16">
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
