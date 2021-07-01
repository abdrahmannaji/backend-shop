const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')

const Shop = require('../models/Shop')
exports.getShops = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults)
})

exports.getShop = asyncHandler(async (req, res, next) => {
    console.log(req.user.id);
    const shop = await Shop.find
    ({userid:req.user.id}).populate({
        path: 'subscriber',})
// مرحبانتشسلميتشبسلايبالشسنيب
    if (!Shop)
        return next(new ErrorResponse(`No Shop with that id of ${req.params.id}`))

        res.status(200).json({ success: true, data: shop })
})
//....count-of-videos...

exports.createShop = asyncHandler(async (req, res, next) => {
    var numbershop;
    const shopfind = await Shop.find().select('userid')
      


        if (shopfind){
            res.status(500).json({
                success: false,
               
                error: 'Server Error'
               
              })
        // return next(new ErrorResponse(`تم اضافة متجر بهذا الحساب مسبقا`))
       
    }

    let {
        email,
        userid,
        password,
        nameShop,
        address,
        phone,
        phone2,
        logo,
        shopCasingimage,
        facebook,
        twitter,
        youtube,
        instagram,

    } = req.body

    shop = await Shop.create({
        userid,
        email,
        numbershop:numbershop,
        password,
        nameShop,
        address,
        phone,
        phone2,
        logo,
        shopCasingimage,
        facebook,
        twitter,
        youtube,
        instagram,


    })
    res.status(200).json({ success: true, data: shop })
}),
    // exports.createShop = asyncHandler(async (req, res, next) => {
        // const shopfind = await Shop.find().select('userid')
        // console.log(shopfind);
        // if(shopfind)
    //     const shop = await Shop.create(req.body)
        
    //     res.status(200).json({ success: true, data: shop })
    // })

// @desc    Update Shop
// @route   PUT /api/v1/auth/Shops/:id
// @access  Private/Admin
exports.updateShop = asyncHandler(async (req, res, next) => {
    req.body.password = ''
    delete req.body.password

    const Shop = await Shop.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        context: 'query'
    })

    if (!Shop)
        return next(new ErrorResponse(`No Shop with that id of ${req.params.id}`))

    res.status(200).json({ success: true, data: Shop })
})

// @desc    Delete Shop
// @route   DELETE /api/v1/auth/Shops/:id
// @access  Private/Admin
exports.deleteShop = asyncHandler(async (req, res, next) => {
    const Shop = await Shop.findById(req.params.id)

    if (!Shop)
        return next(new ErrorResponse(`No Shop with that id of ${req.params.id}`))

    await Shop.findByIdAndDelete(req.params.id)

    res.status(200).json({ success: true, data: {} })

}
)


