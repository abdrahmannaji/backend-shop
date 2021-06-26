
const mongoose = require('mongoose')


const uniqueValidator = require('mongoose-unique-validator')
const { init } = require('./Video')

const Schema = mongoose.Schema
const ProductItem = new Schema(
    {
        


       phone: {
          
           names:{
            id:Number,
            name:{
            type: String,}
           },
           logophonne: {
            type: String,
            default: 'MaxSport.png',
          
        },
        phonetypes:{ 
          id:Number,
          phonetype:{
            type: String,
          }
        }
        },
 
          color:{
            type: String,
          },
          ram:{
            type: String,
          },
         
          rom:{
            type: String,
          },
          status: {
            type: String,
          },


    })


module.exports = mongoose.model('ProductItem', ProductItem)