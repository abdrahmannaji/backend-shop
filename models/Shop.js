const crypto = require('crypto')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const uniqueValidator = require('mongoose-unique-validator')
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
        },
        phone: {
            type: String,

        },
        numbershop:{
          type: Number,
        },
        phone2: {
            type: String,

        },

        logo: {
            type: String,
            default: 'Logo MaxSport.png'
        },
        shopCasingimage: [],

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
    { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }

)
ShopSchema.virtual('subscriber', {
  ref: 'Subscription',
  localField: '_id',
  foreignField: 'channelId',
  justOne: false,
  count: true,
  match: { shopId: this._id }
})
  ShopSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
  }

  ShopSchema.pre('find', function () {
    this.populate({ path: 'subscriber' })
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


















