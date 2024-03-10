import { CustomTabs } from "@/components/Tabs/CustomTabs";
import AddCategoryForm from "@/components/category/AddCategoryForm";
import { useAppSelector } from "@/hooks";
import { ICategory } from "@/types";

const CataloguePage = () => {
  const { catalogue } = useAppSelector((store) => store.catagoryInfo);

  return (
    <div className="md:min-h-screen">
      <CustomTabs
        type="catagory"
        children={<AddCategoryForm />}
        tab1="Catagory details"
        data={catalogue as ICategory[]}
        tab2="Add new Catagory"
      />
    </div>
  );
};

export default CataloguePage;
