const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

const router = express.Router();

const Notes = require("../models/notesModel");
const User = require("../models/User");
// const { type } = require("@testing-library/user-event/dist/type");

// Route to get the user notes from db   login required : done by fetch user (middleware) by checking token given by user and taking out the User id from token
router.get("/fetchnotes", fetchUser, async (req, res) => {
  try {
    const note = await Notes.find({ user: req.id });
    res.send(note);
  } catch (error) {
    res.status(501).send("error  hai fetchnotes mai");
  }
});

// Router to create note  /api/notes/createnotes :: login required
router.post(
  "/createnote",
  fetchUser,
  [
    body("discription", "Enter disription mininmum 3 character").isLength({
      min: 3,
    }),
    body("title", "Enter title properly").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // create notes of each user seprately
      const note = await Notes.create({
        discription: req.body.discription,
        title: req.body.title,
        user: req.id, // To uniquly add notes of a particular user
      });

      res.json(note);
    } catch (error) {
      res.status(501).send("Error in create");
    }
  }
);

// Route to update note  /api/notes/updatenote :: login required

router.put("/updatenote/:id", fetchUser, async (req, res) => {
  try {

    /*            other way 
    fetch  all the notes of that user
    const notesOfUser = await Notes.find({ user: req.id });

    check if this user authority to update the note i.e find the note which is to be update in notesofuser
    const uniqueNoteid = req.params.id.toString();
    let note = notesOfUser.find((o) => o.id === uniqueNoteid);
    if (!note) {
      return res.send("dusre ka note update krr rha ha ");
    }
    */

    // create new note
    const { discription, title } = req.body;
    const updatedNote = {};
    if (discription) {
      updatedNote.discription = discription;
    }
    if (title) {
      updatedNote.title = title;
    }

    // find note in the database using unique note id
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.send("nhi hai note ");
    }

    // check if the note belong to same user using user id and note id
    if (note.user.toString() !== req.id) {
      return res.send("dusre ka edit krega ff");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: updatedNote },
      { new: true }
    );

  
    res.send("hassan");
  } catch (error) {
    res.status(501).send("Error in update ");
  }
});



// Route to delete a note login required

router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {

  

    
    // find note in the database using unique note id
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.send("nhi hai note ");
    }

    // check if the note belong to same user using user id and note id
    if (note.user.toString() !== req.id) {
      return res.send("dusre ka edit krega ff");
    }

  
    let ans = await Notes.findByIdAndRemove(req.params.id);
    res.send(ans);
  


  } catch (error) {
    res.status(501).send("Error in update ");
  }
});

module.exports = router;
