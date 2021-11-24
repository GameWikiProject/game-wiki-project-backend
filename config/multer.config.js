const multer = require('multer')
const path = require('path')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/')
    },
    filename: (req, file, cb) => {
        if(file)
            cb(null, req.FILEID + path.extname(file.originalname))
    }
});

module.exports = multer({ storage: storage })