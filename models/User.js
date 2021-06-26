const crypto = require('crypto')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    channelName: {
      type: String,
      required: [true, 'Please add a channel name'],
      unique: true,
      uniqueCaseInsensitive: true
    },
    lName: {
      type: String,
      required: [true, 'Please add a L name'],

    },

    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      uniqueCaseInsensitive: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
    },
    photoUrl: {
      type: String,
      default: 'assets/images/Logo MaxSport.png'
    },
    shopCasingimage: {
      type: String,

      default: 'noImage.jpg'
    },
    address: {
      type: String,
    },
    country: {
      type: String,
    },
    city: {
      type: String,

    },
    verification_code: {
      type: Number,

    },
    phone: {
      type: String,

    },
    // phone2: {
    //   type: String,

    // },
    email_verified_at: {
      type: Date
    },
    verification_code: {
      type: String,
    },
    user_type: {
      type: String,
      // enum: ['user', 'admin'],
      // default: 'user',
      required: [true, 'Please add a user_type'],
      // unique: true,
      // uniqueCaseInsensitive: true
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: [6, 'Must be six characters long'],
      select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
)

UserSchema.index({ channelName: 'text' })
UserSchema.virtual('subscribers', {
  ref: 'Subscription',
  localField: '_id',
  foreignField: 'channelId',
  justOne: false,
  count: true,
  match: { userId: this._id }
})

UserSchema.virtual('videos', {
  ref: 'Video',
  localField: '_id',
  foreignField: 'userId',
  justOne: false,
  count: true
})
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
}
UserSchema.plugin(uniqueValidator, { message: '{PATH} already exists.' })

UserSchema.pre('find', function () {
  this.populate({ path: 'subscribers' })
})

// Ecrypt Password
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}


UserSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex')

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000

  return resetToken
}

module.exports = mongoose.model('User', UserSchema)
