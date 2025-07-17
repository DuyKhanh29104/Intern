module.exports = {
  getAll: async function (req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (err) {
      return res.serverError(err);
    }
  },

  addPermission: async function (req, res) {
    const { id, permissions } = req.body;
    if (!id || !permissions || !Array.isArray(permissions)) {
      return res.badRequest({ message: 'Thiếu id hoặc permissions (mảng)' });
    }

    try {
      const user = await User.findOne({ id });
      if (!user) return res.notFound({ message: 'User không tồn tại' });

      const newPermissions = Array.from(new Set([...(user.permissions || []), ...permissions]));
      const updated = await User.updateOne({ id }).set({ permissions: newPermissions });

      return res.json({ message: 'Đã thêm quyền', user: updated });
    } catch (err) {
      return res.serverError(err);
    }
  },

  removePermission: async function (req, res) {
    const { id, permissions } = req.body;
    if (!id || !permissions || !Array.isArray(permissions)) {
      return res.badRequest({ message: 'Thiếu id hoặc permissions (mảng)' });
    }

    try {
      const user = await User.findOne({ id });
      if (!user) return res.notFound({ message: 'User không tồn tại' });

      const filteredPermissions = (user.permissions || []).filter(p => !permissions.includes(p));
      const updated = await User.updateOne({ id }).set({ permissions: filteredPermissions });

      return res.json({ message: 'Đã xoá quyền', user: updated });
    } catch (err) {
      return res.serverError(err);
    }
  }
};
