module.exports = {
    // GET /api/products
    find: async function (req, res) {
      try {
        const products = await Product.find();
        return res.json(products);
      } catch (err) {
        return res.serverError(err);
      }
    },
    
    create: async function (req, res) {
      try {
        const userId = req.user?.id;
        const data = req.body;
    
        if (Array.isArray(data)) {
          const productsWithOwner = data.map(item => ({
            ...item,
            owner: userId
          }));
    
          const created = await Product.createEach(productsWithOwner).fetch();
          return res.status(201).json(created);
        } else {
          const created = await Product.create({
            ...data,
            owner: userId
          }).fetch();
          return res.status(201).json(created);
        }
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error creating product', error: err });
      }
    },
  
    // PUT /api/products/:id
    update: async (req, res) => {
      const { id } = req.params;
      const { name, price } = req.body;
      const updated = await Product.updateOne({ id }).set({ name, price });
      if (!updated) return res.notFound();
      return res.json(updated);
    },
  
    // DELETE /api/products/:id
    delete: async (req, res) => {
      const { id } = req.params;
      const deleted = await Product.destroyOne({ id });
      if (!deleted) return res.notFound();
      return res.json({ message: 'Product deleted' });
    }
  };
  