import { CustomTabs } from "@/components/Tabs/CustomTabs";
import ProductForm from "@/components/products/ProductForm";
import { useAppSelector } from "@/hooks";

const ProductPage = () => {
  const { product } = useAppSelector((store) => store.productsData);

  return (
    <div className="min-h-screen">
      <CustomTabs
        type="product"
        tab1="Product Details"
        tab2="Add new products"
        data={product}
        children={<ProductForm />}
      />
    </div>
  );
};

export default ProductPage;
