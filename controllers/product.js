const asyncHandler = require('../middleware/async')
constErrorResponse = require('../utils/errorResponse')

const Shop = require('../models/Shop')
const Product = require('../models/Product')
const path = require('path')
const fs = require('fs');




module.exports = {
  

    createProduct:async (req, res, next) => {
        const shopid = await Shop.find({ ShopId: req.params.id })
        const files = req.files;
        console.log(files)
        if(!files){
            const error = new Error('Please choose files');
            error.httpStatusCode = 400;
            return next(error)
        }
       
    console.log('jj')
    
    fan=files.map((src, index) => {
        console.log('ff')
        return files[index].filename;
    });
    console.log(fan);
          
          let {
              name,
              type_phone,
              phone_size,
              phone_Weight,
              battery_capacity,
              Phone_version,
              colors,
              ram,
              rom,
              status,
              quantity,
              unit_price,
              purchase_price,
              category,
              rating_avg,
              description,
              approved_by
      
          } = req.body
      
          product = await Product.create({
              name,
              shop_id: shopid.id,
              type_phone,
              phone_size,
              phone_Weight,
              battery_capacity,
              Phone_version,
              colors,
              ram,
              rom,
              status,
              quantity,
              unit_price,
              purchase_price,
              category,
              rating_avg,
              description,
            img:fan,
              approved_by
          })
          res
              .status(200)
              .json({ success: true, product: product });
      },
    getProducts:asyncHandler(async (req, res, next) => {
        res.status(200).json(res.advancedResults)
      }),
    getShopProducts: (req, res) => {
        const id = req.params.id;
        getShopProducts(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'No product found !'
                });
            }
            return res.json(
                results
            );
        });
    },
    getProductById: (req, res) => {
        const id = req.params.id;
        getProductById(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'Product not found'
                });
            }
            return res.json(
                results
            );
        });
    },
    updateProduct: (req, res) => {
        const id = req.params.id;
        const body = req.body;
        updateProduct(id, body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Oops something went wrong'
                });
            }
            // if (!results) {
            //     return res.json({
            //         success: 0,
            //         message: 'User not found'
            //     });
            // }
            return res.status(200).json({
                success: 1,
                message: 'Product updated successfully'
            });
        });
    },
    deleteProduct: (req, res) => {
        const id = req.params.id;
        deleteProduct(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            // if (!results) {
            //     return res.json({
            //         success: 0,
            //         message: 'User not found'
            //     });
            // }
            return res.json({
                success: 1,
                data: 'Product deleted successfully'
            });
        });
    },
}



