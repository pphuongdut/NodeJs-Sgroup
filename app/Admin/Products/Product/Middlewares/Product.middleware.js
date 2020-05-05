const multer = require('multer');
let diskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/uploads');
    },
    filename: (req, file, callback) => {
        let filename = `${Date.now()}-${file.originalname}`;
        console.log(filename);
        callback(null, filename);
    },
});

let uploadFile = multer({ storage: diskStorage });
module.exports = { uploadFile };
