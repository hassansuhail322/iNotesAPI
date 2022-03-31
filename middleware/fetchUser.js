const jwt = require("jsonwebtoken");
const jwtString = "ThisIsAstringtogenteratetokenline-39";

const fetchUser = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) {
      res.status(401).send("invalid token ");
    }

    var data = jwt.verify(token, jwtString);

    // req.user = data.user;  code with
    // console.log(req.user);

    req.id = data.id;

    next();
  } catch (err) {
    res.status(401).json({ error: "invalid token " });
  }
};

module.exports = fetchUser;
