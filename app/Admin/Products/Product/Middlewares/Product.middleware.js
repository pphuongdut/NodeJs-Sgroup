const multer = require('multer');
const uploadFile = multer({
    destination: (req, file, callback) => {
        callback(null, '../../../../../uploads');
    },
    filename: (req, file, callback) => {
        let filename = `${Date.now()}-product-${file.originalname}`;
        callback(null, filename);
    },
}).single('imgProduct');
module.exports = { uploadFile };
