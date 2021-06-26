const asyncHandler = require('../middleware/async')
constErrorResponse = require('../utils/errorResponse')

const ProdauctItem = require('../models/prodauctitem')
const multer = require('multer');
const path = require('path')





exports.getProductItems = asyncHandler(async (req, res, next) => {

    ProdauctItem.find().then(doc => {

        res.status(200).json(
          doc
  
        
          

        )
    }).catch(err => {
        res.status(404).json({
            massage: err
        })
    })

    // res.status(200).json({ data: ProdauctItem })
})
exports.getnamephone = asyncHandler(async (req, res, next) => {

  ProdauctItem.find().select("namephone").then(doc => {
      res.status(200).json(
          doc,
      )
  }).catch(err => {
      res.status(404).json({
          massage: err
      })
  })
// res.status(200).json({ data: ProdauctItem })
})
exports.uploadLogophone = asyncHandler(async (req, res, next) => {
    const prodauctitem = await ProdauctItem.findById(req.params.id).populate({
        path: 'ProductItem'
      })      
      if (!prodauctitem)
      return next(new ErrorResponse(`No user with that id of ${req.params.id}`))
    if (!req.files) {
      return next(new ErrorResponse(`Please upload a file`, 404))
    }
    const file = req.files.avatar
    if (!file.mimetype.startsWith('image')) {
      return next(new ErrorResponse(`Please upload an image file`, 404))
    }
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return next(
        new ErrorResponse(
          `Please upload an image less than ${process.env.MAX_FILE_UPLOAD / 1000 / 1000
          }mb`,
          404
        )
      )
    }
    file.name = `avatar-${req.params.id}${path.parse(file.name).ext}`
    console.log(prodauctitem.phone.logophonne)
    file.mv(
      `${process.env.FILE_UPLOAD_PATH}/avatars/${file.name}`,
      async (err) => {
        if (err) {
          console.error(err)
          return next(new ErrorResponse(`Problem with file upload`, 500))
        }
        prodauctitem.phone.logophonne = file.name
        await  prodauctitem.save()
        console.log(prodauctitem.phone.logophonne)
        res.status(200).json({ success: true, data: file.name })
      }
    )
  })

  
 
 
exports.addProductItems = asyncHandler(async (req, res, next) => {
  const shop = await ProdauctItem.create(req.body)

  res.status(201).json({ success: true, data: shop })
  

})
