const express = require("express");
const asyncHandler = require("express-async-handler");
const { Note, Notebook } = require("../../db/models");
const { requireAuth } = require('../../utils/auth')


const router = express.Router();


// Get a single note
router.get('/:noteId', asyncHandler(async (req, res) => {
    const {noteId} = req.params;
    const note = await Note.findByPk(noteId);
    return res.json(note)
}))



// Post a new note
router.post('/', requireAuth, asyncHandler(async (req, res) => {

    const { userId, notebookId, content, title } = req.body;

    const newNote = await Note.create({
        title: title,
        userId: userId,
        content: content,
        notebookId: notebookId,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    // await newNote.save();

    console.log('newNote in backend:', newNote)
    return res.json(newNote)
}));


// Delete a specific note
router.delete('/:noteId', asyncHandler(async (req, res) => {
    const { noteId } = req.params;
    const note = await Note.findByPk(noteId);
    await note.destroy();
    return res.json(note);
}))



// Edit a specific note
router.put('/:noteId', asyncHandler(async (req, res) => {
    const { noteId } = req.params;

    const oldnote = await Note.findByPk(noteId);
    // const { notebookId, title, content } = req.body;
    // console.log('backend notebookId:', notebookId)
    const { title, content } = req.body;

    const newNote = await oldnote.update({
        // notebookId: notebookId,
        title: title,
        content: content
    })

    console.log("Backend updated Note:", newNote)
    return res.json(newNote)
}))



module.exports = router;
