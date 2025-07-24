const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Absolute path to the uploads folder (outside src/)
const uploadPath = path.join(__dirname, "../../uploads");

// Automatically create the uploads folder if it doesn't exist
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Multer storage config for local storage
// const localstorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadPath);
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     cb(null, `${Date.now()}${ext}`);
//   },
// });

// Use memory storage for direct upload to Cloudinary
const storage = multer.memoryStorage();

const upload = multer({ storage });
const singleUpload = multer({storage}).single('file');

module.exports = {upload,singleUpload};



// const storage = multer.memoryStorage();

