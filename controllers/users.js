const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/User')
const videos = require('../models/Video')
const Shop = require('../models/Shop')

// @desc    Get all users
// @route   GET /api/v1/auth/users
// @access  Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

// @desc    Get single user
// @route   GET /api/v1/auth/users/:id
// @access  Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate({
    path: 'subscribers'
  })

  if (!user)
    return next(new ErrorResponse(`No user with that id of ${req.params.id}`))

  res.status(200).json({ success: true, data: user })
})
//....count-of-videos...
exports.getVideosByUserId = asyncHandler(async (req, res, next) => {
  const uservideos = await videos.find({ userId: req.params.id })


  if (!uservideos) {
    return next(
      new ErrorResponse(
        `No videos with that user id of ${req.params.userId}`
      )
    )
  }

  res.status(200).json({ sucess: true, data: uservideos.length })
})

// @desc    Create user
// @route   POST /api/v1/auth/users
// @access  Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body)

  res.status(201).json({ success: true, data: user })
})

// @desc    Update user
// @route   PUT /api/v1/auth/users/:id
// @access  Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  req.body.password = ''
  delete req.body.password

  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    context: 'query'
  })

  if (!user)
    return next(new ErrorResponse(`No user with that id of ${req.params.id}`))

  res.status(200).json({ success: true, data: user })
})

// @desc    Delete user
// @route   DELETE /api/v1/auth/users/:id
// @access  Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user)
    return next(new ErrorResponse(`No user with that id of ${req.params.id}`))

  await User.findByIdAndDelete(req.params.id)

  res.status(200).json({ success: true, data: {} })
})
