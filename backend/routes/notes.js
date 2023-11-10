const express = require("express");
const router = express.Router();
const fetchUser = require("../middlewares/fetchUser");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

router.get("/fetchallnotes", fetchUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const notes = user.notes;
        return res.status(200).json({ notes });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

router.post("/addnote", fetchUser, [
    body("title", "Enter a Valid Title").isLength({ min: 5 }),
    body("description", "Description must have atleast 5 characters").isLength({ min: 10 })], 
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }
        try {
            const { title, description, tag } = req.body;
            const user = await User.findById(req.user.id);
            user.notes.push({ title, description, tag });
            await user.save();
            return res.status(200).json({ notes: user.notes });
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
    })

router.put("/updatenote/:id", fetchUser, [
    body("title", "Enter a Valid Title").isLength({ min: 5 }),
    body("description", "Description must have atleast 5 characters").isLength({ min: 10 })],
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() })
        }
        try {
            const { title, description, tag } = req.body
            const newNote = {}
            if (title) { newNote.title = title }
            if (description) { newNote.description = description }
            if (tag) { newNote.tag = tag }
            let note = await Notes.findById(req.params.id)
            if (!note) { return res.status(404).send("No such note found") }
            if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") }
            note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            return res.status(200).json({ note })
        }
        catch (err) {
            console.error(err.message)
            return res.status(500).send("Internal Server Error")
        }
    })

router.delete("/deletenote/:id", fetchUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        let note = user.notes.find((note) => note.id === req.params.id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" })
        }
        user.notes = user.notes.filter((note) => note.id !== req.params.id);
        await user.save();
        return res.status(200).json({ notes: user.notes });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

module.exports = router;