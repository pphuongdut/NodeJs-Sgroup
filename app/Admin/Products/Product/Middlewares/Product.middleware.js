const multer = require('multer');
let diskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/');
    },
});
let uploadFile = multer({ storage: diskStorage }).single('imgProduct');

module.exports = { uploadFile };
