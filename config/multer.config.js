const multer = require('multer')
const path = require('path')
var maxSize = 5 * 1024 * 1024;

var storage = multer.diskStorage({
    destination: (req, file, cb) => { 
        cb(null, './public/')
    },
    filename: (req, file, cb) => {
        req.FILELOCALPATH = `${file.fieldname}-${Date.now()}`+ path.extname(file.originalname)
        if(file)
            cb(null, req.FILELOCALPATH)
    },
});

module.exports = multer({ storage: storage, limits: {fileSize: maxSize} })