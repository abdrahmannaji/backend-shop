const crypto = require('crypto')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

const ShopSchema = new Schema(
    {
        userid: {
            type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
        },
        nameShop: {
            type: String,
            required: [true, 'Please add a NameShop'],
            unique: true,
            uniqueCaseInsensitive: true

        },
        email: {
            type: String,
        
            unique: true,
            uniqueCaseInsensitive: true,
        
          },
        password: {
            type: String,
            required: [true, 'Please add a password'],
            minlength: [6, 'Must be six characters long'],
            select: false
          },
        address: {
            type: String,
            required: [true, 'Please add a Address'],

        },
        phone: {
            type: String,

        },
        phone2: {
            type: String,

        },

        logo: {
            type: String,
            default: 'assets/images/Logo MaxSport.png'
        },
        shopCasingimage: {
            type: Array,

            default: 'noImage.jpg'
        },

        facebook: {
            type: String,

        },
        twitter: {
            type: String,
        },
        youtube: {
            type: String,

        },
        instagram: {
            type: String,
        },

        sliders: {

            type: String,
        },
        slug: {
            type: String,

        },

    },
    { timestamps: true }

)

ShopSchema.virtual('subscribers', {
    ref: 'Subscription',
    localField: '_id',
    foreignField: 'channelId',
    justOne: false,
    count: true,
    match: { userId: this._id }
  })
  ShopSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
  }

  ShopSchema.pre('find', function () {
    this.populate({ path: 'subscribers' })
  })
  
  ShopSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    })
  }
  ShopSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next()
    }
  
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  })
  

  
module.exports = mongoose.model('Shop', ShopSchema)


















