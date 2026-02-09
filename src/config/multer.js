const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination:(req,file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req,file, cb) => {
    cb(null,`${Date.now()}-${file.originalname}`);
  }
});

const upload =multer({
  storage,
  fileFilter:(req, file, cb)=>{
    const ext = path.extname(file.originalname);
    if(ext!=".mp4"){
      return cb(new Error("Only mp4 videos allowed "))
    }
    cb(null, true);
  }
})
module.exports = upload