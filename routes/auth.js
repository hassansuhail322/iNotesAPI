const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");

const router = express.Router();

const jwtString = "ThisIsAstringtogenteratetokenline-39";

// Route to   create user
router.post(
  "/create",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password", "Enter a strong password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      // check if the data from user is correct..
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // check  if email already exist in ( User model )
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Email already exist " });
      }

      // generating salt and hash for password
      const Salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, Salt);

      // create doc in model of User
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
      });

      // const data = {
      //   user: {
      //     id: user.id,
      //   },
      // };

      // console.log(data);

      const authToken = jwt.sign({ id: user.id }, jwtString);
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("koi error aagya");
    }
  }
);

// Route for login
router.post(
  "/login",
  [
    body("email", "Enter proper email.").isEmail(),
    body("password", "Enter password").isLength({ min: 1 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      let user = await User.findOne({ email: email });

      // check if user is is in database or not
      if (!user) {
        return res
          .status(400)
          .json({ error: "kindly enter valid credentials email id" });
      }

      const passwordCompair = await bcrypt.compare(password, user.password);

      // if password match or not
      if (!passwordCompair) {
        res.status(400).json({ error: "enter valid credentials password  " });
      }

      // token generator if login successfully

      // code with
      // const data = {
      //   user: {
      //     id: user.id,
      //   },
      // };
      // const authToken = jwt.sign(data, jwtString);

      const authToken = jwt.sign({ id: user.id }, jwtString);

      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("koi error aagya");
    }
  }
);

// Route to fetch user using token which were given during creation ans login
router.post("/fetchuser", fetchUser, async (req, res) => {
  try {
    // const  userId = req.user.id;  //
    const userId = req.id;

    let user = await User.findOne({ id: userId }).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).send("error in fetch user request");
  }
});

module.exports = router;
