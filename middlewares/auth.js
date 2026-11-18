module.exports = (req, res, next) => {
  const { authUser } = req.session;

  if (!authUser) {
    return res.redirect("/");
  }

  res.locals.authUser = authUser;
  return next();
};
