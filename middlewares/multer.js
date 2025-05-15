// importo multer
const multer= require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // cb(null, file.fieldname + '-' + uniqueSuffix)
    const fileUniqueName =`${Date.now()}-${Math.round(Math.random() * 1E9)}-${file.originalname}`
    cb(null,fileUniqueName)
  }
})

const upload = multer({ storage })

module.exports= upload;