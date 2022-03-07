const multer = require('multer');

let storage = multer.memoryStorage();
let upload = multer({storage: storage});

export default upload;
