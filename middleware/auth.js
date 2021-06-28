const jwt = require('jsonwebtoken')
const asyncHandler = require('./async')
const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/User')


exports.protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }
  // Set token from cookie
  else if (req.cookies.token) {
    token = req.cookies.token
  }

  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401))
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decoded.id).populate('subscribers')
    next()
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401))
  }
})

// Grant access to specific user_types
exports.authorize = (...user_types) => {
  return (req, res, next) => {
    if (!user_types.includes(req.user.user_type)) {
      return next(
        new ErrorResponse(
          `User user_type ${req.user.user_type} is not authorized to access this route`,
          403
        )
      )
    }
    next()
  }
}
