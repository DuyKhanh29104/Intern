const config = {
    title: "Product Management",
    api: {
      fetch: "http://localhost:1337/api/products",
      create: "http://localhost:1337/api/products",
      update: (id) => `http://localhost:1337/api/products/${id}`,
      delete: (id) => `http://localhost:1337/api/products/${id}`,
    },
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "price", label: "Price", type: "number" },
      { name: "description", label: "Mô tả", type: "textarea" },
      // {
      //   name: 'category',
      //   label: 'Danh mục',
      //   type: 'select',
      //   options: [
      //     { value: 'phone', label: 'Điện thoại' },
      //     { value: 'laptop', label: 'Laptop' },
      //     { value: 'accessory', label: 'Phụ kiện' },
      //   ],
      // },
      // { name: 'visible', label: 'Hiển thị', type: 'checkbox' },
    ],
    permissions: {
      view: "view_product",
      add: "add_product",
      edit: "edit_product",
      delete: "delete_product",
    },
  };

  export default config;