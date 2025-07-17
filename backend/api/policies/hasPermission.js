module.exports = async function (req, res, proceed) {
    const permission = req.options.permission;
    console.log('Checking permission:', permission);
    console.log('User:', req.user);
    if (!req.user || !req.user.id) {
      return res.forbidden('Bạn chưa đăng nhập');
    }
  
    const user = await User.findOne({ id: req.user.id });
    if (!user || !user.permissions || !user.permissions.includes(permission)) {
        console.log('bạn không có quyền')
        return res.status(403).json({ message: 'Bạn không có quyền thực hiện hành động này' });
    }
  
    return proceed();
  };
  