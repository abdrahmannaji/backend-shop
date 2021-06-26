
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var timestamp = require('mongoose-timestamp');

// Define collection and schema for Course
var Product = new Schema({
  name: {
    type: String,
    required: false
  },
  type_phone:{
    type: String,
    required: false
  },
  shop_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'Shop',
      required: false
  },
  
  phone_size:{
    type: String,
    required: false
  },
  phone_Weight:{
    type: String,
    required: false
  },
  battery_capacity:{
    type: String,
    required: false
  },
  Phone_version:{
    type: String,
    required: false
  },
  colors:{
    type: String,
    required: false
  },
  status:{
    type: String,
    required: false
  },
  rem:{
    type: String,
    required: false
  },
  rom:{
    type: String,
    required: false
  },
  img:{
    type: String,
    required: false
  },
  quantity: {
    type: Number,
    default:0,
    required: false  

},
  unit_price: {
      type: Number,
      required: false ,
      default:0 
  },
  purchase_price: {
    type: Number,
    required: false ,
    default:0 
},
tax: {
  type: Number,
  required: false ,
  default:0 
},

dscount: {
  type: Number,
  required: false  
},

  category: {
    type: String,
    required: false
  },
  rating_avg: {                //estimated delivery time
      type: Number,
      default:0
  },

  description: {              //like veg, non-veg
      type: String,
      required: false
  },
  is_approved: {
      type: Boolean,
      default: false
  },
  approved_by: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: false
  },
  approved_on: {
      type: Date,
      default: Date.now
  }
},{
    collection: 'product'
});

Product.plugin(timestamp);

module.exports = mongoose.model('Product', Product);