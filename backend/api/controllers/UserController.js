module.exports = {
    getAll: async function (req, res) {
      try {
        const users = await User.find();
        return res.json(users);
      } catch (err) {
        return res.serverError(err);
      }
    },

    updateRole: async function (req, res) {
      const { id, role } = req.body;
      if (!id || !role) return res.badRequest({ message: 'Missing id or role' });
  
      try {
        const updated = await User.updateOne({ id }).set({ role });
        return res.json({ message: 'Role updated', user: updated });
      } catch (err) {
        return res.serverError(err);
      }
    }
  };
  