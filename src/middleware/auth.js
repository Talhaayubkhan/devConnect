const adminAuth = (req, res, next) => {
  const token = "hello";
  const isAdminTrue = token === "asd";

  if (!isAdminTrue) {
    res.status(401).send("You are not authorized to access this data.");
  } else {
    next();
  }
};
const userAuth = (req, res, next) => {
  const token = "hello";
  const isUserTrue = token === "hello";

  if (!isUserTrue) {
    res.status(401).send("You are not authorized to access this data.");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
