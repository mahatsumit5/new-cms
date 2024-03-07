export const ProductFormInputFields = [
  {
    name: "title",
    label: "Name ",
    type: "text",
    description: "Write a name for your prouduct",
    placeholder: "Denim Pants",
  },

  {
    name: "sku",
    label: "SKU",
    type: "text",
    placeholder: "DENIM-TV-30",
    description: "Give a sku for your prouduct",
  },
  //
  //   {
  //     name: "salesStartDate",
  //     label: "Sales Start Date",
  //     type: "Date",
  //   },
  //   {
  //     name: "salesEndDate",
  //     label: "Sales End Date",
  //     type: "Date",
  //   },
];
export const numberFields = [
  {
    name: "qty",
    label: "QUANTITY",
    type: "number",
    placeholder: "50",
    description: "Give a mimimun available quantity",
  },
  {
    name: "price",
    label: "Price",
    type: "number",
    placeholder: "$ 3000",
    min: 1,
    description: "Select a price for you product",
  },
  {
    name: "salesPrice",
    label: "Sales Price",
    type: "number",
    description: "Select a sales price for you product if available",
    placeholder: "$ 3000",
  },
];
