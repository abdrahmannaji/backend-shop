const asyncHandler = require('../middleware/async')
constErrorResponse = require('../utils/errorResponse')

const Shop = require('../models/Shop')
const videos = require('../models/Video')

const User = require('../models/User')
exports.getShops = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults)
})

exports.getShop = asyncHandler(async (req, res, next) => {
    const shop = await Shop.findById(req.body.userid).populate({
        path: 'subscribers'
    })

    if (!Shop)
        return next(new ErrorResponse(`No Shop with that id of ${req.params.id}`))

    res.status(200).json({ success: true, data: shop })
})
//....count-of-videos...
exports.getVideosByShopId = asyncHandler(async (req, res, next) => {
    const Shopvideos = await videos.find({ ShopId: req.params.id })


    if (!Shopvideos) {
        return next(
            new ErrorResponse(
                `No videos with that Shop id of ${req.params.ShopId}`
            )
        )
    }

    res.status(200).json({ sucess: true, data: Shopvideos.length })
})
exports.register = asyncHandler(async (req, res, next) => {

    // console.log('id' + req.user._id);
    // const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // req.user = await User.findById(decoded.id).populate('subscribers')

    let {
      
        email,
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
        userid: req.user._id,
        email,
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
    res
        .status(200)
        .json({ success: true, nameShop: shop.userid });
}),
    exports.createShop = asyncHandler(async (req, res, next) => {
        const shop = await Shop.create(req.body)

        res.status(201).json({ success: true, data: shop })
    })

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


