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
    ],
    permissions: {
      view: "view_product",
      add: "add_product",
      edit: "edit_product",
      delete: "delete_product",
    },
  };
  
  export default config;