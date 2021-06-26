
const fs = require('fs');


exports.home = async (req, res) => {
    const all_images = await UploadModel.find()
    res.render('main', { images : all_images });
}

exports.uploads = (req, res , next) => {
    const files = req.files;

    if(!files){
        const error = new Error('Please choose files');
        error.httpStatusCode = 400;
        return next(error)
    }
   
console.log('jj')

fan=files.map((src, index) => {
    return files[index].filename;
});
console.log(fan);

// UploadModel({
//     filename :fan,
// })
// .save()
//                 .then(() => {
//                     console.log('vv')
//                     return { msg : `Uploaded Successfully...!`}
//                 })
//                 .catch(error =>{
//                     console.log('rr')
//                     if(error){
//                         if(error.name === 'MongoError' && error.code === 11000){
//                             return Promise.reject({ error : `Duplicate . File Already exists! `});
//                         }
//                         return Promise.reject({ error : error.message || `Cannot Upload  cxSomething Missing!`})
//                     }
//                 });
    // convert images into base64 encoding
    // let imgArray = files.map((file) => {
    //     let img = fs.readFileSync(file.path)

    //     return encode_image = img.toString('base64')
    // })

    // let result = imgArray.map((src, index) => {

        // create object to store data in the collection
        // let finalImg = {
        //     filename : files[index].originalname,
        //     contentType : files[index].mimetype,
        //     imageBase64 : src
        // }

        // let newUpload = new UploadModel(finalImg);
// console.log(  files[index].fieldname + '-' + Date.now() +  files[index].ext);
        // return newUpload
                
    // });

    Promise.all(res)
        .then( msg => {
                res.json(msg);
            res.redirect('/')
        })
        .catch(err =>{
            res.json(err);
        })
        console.log(fan);
}