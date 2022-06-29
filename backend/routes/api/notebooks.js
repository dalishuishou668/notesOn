const { Op } = require("sequelize");
const express = require("express");
const asyncHandler = require("express-async-handler");
const { Notebook, Note } = require("../../db/models");
const { requireAuth } = require('../../utils/auth')
const router = express.Router();



//GET all notes of a specific notebook
router.get('/:notebookId/notes', asyncHandler(async (req, res) => {
    const { notebookId } = req.params;

    const notebookNotes = await Note.findAll({
        where: {
            notebookId: {
                [Op.eq]: notebookId
            }
        }
    })

    return res.json(notebookNotes)
}))

// GET A SINGLE NOTEBOOK
router.get('/:notebookId', asyncHandler(async (req, res) => {
    const { notebookId } = req.params;

    const notebook = await Notebook.findByPk(notebookId)

    return res.json(notebook);
}))





// CREATE a notebook /localhost:3000/api/notebooks
router.post('/', requireAuth, asyncHandler(async (req, res) => {
    console.log('backend create notebooks')

    const { title, userId } = req.body;
    const newNotebook = await Notebook.create({
        title: title,
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
    });


    return res.json(newNotebook);
}))


// DELETE a specfiic notebook
router.delete('/:notebookId', requireAuth, asyncHandler(async (req, res) => {
    const { notebookId } = req.params;
    const notebook = await Notebook.findByPk(notebookId);
    await notebook.destroy();
    console.log('%%%%%%backend:', notebook)
    return res.json(notebook)

}))



//Edit a specific notebook
router.put('/:notebookId', requireAuth, asyncHandler(async (req, res) => {

    const { title } = req.body;
    const { notebookId } = req.params;

    const notebook = await Notebook.findByPk(notebookId)

    await notebook.update({ title: title })
    console.log('************backend edit notebook:', notebook)
    return res.json(notebook)

}))


module.exports = router;
