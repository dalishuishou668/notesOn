const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Note, Notebook } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];



// Sign up
router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

// previous version sign-up
// router.post(
//     '/',
//     asyncHandler(async (req, res) => {
//       const { email, password, username } = req.body;
//       const user = await User.signup({ email, username, password });

//       await setTokenCookie(res, user);

//       return res.json({
//         user
//       });
//     })
//   );

// read all notebooks for a specific user /localhost:3000/api/users/:userId/notebooks
router.get('/:userId/notebooks', asyncHandler(async (req, res) => {
  console.log('backend read all notebooks')

  const {userId} = req.params
  // const userId = parseInt(req.params.id, 10);
  const notebooks = await Notebook.findAll({
    where:{
      userId
    }
  })


  return res.json( notebooks )
}))

// read all notes for a specific user
router.get('/:userId/notes', asyncHandler(async (req, res) => {
  console.log('backend read all notes')

  // const userId = parseInt(req.params.id, 10);
  const {userId} = req.params
  const notes = await Note.findAll({
    where:{
      userId
    }
  })

  return res.json( notes )
}))




module.exports = router;
