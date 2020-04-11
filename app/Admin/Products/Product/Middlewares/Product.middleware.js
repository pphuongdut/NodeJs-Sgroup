const multer = require('multer');
let diskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads');
    },
    filename: (req, file, callback) => {
        let filename = `${Date.now()}-product-${file.originalname}`;
        callback(null, filename);
    },
});
let uploadFile = multer({ storage: diskStorage }).single('imgProduct');

module.exports = { uploadFile };
