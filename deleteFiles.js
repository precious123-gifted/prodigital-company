require('dotenv').config();
const cloudinary = require('cloudinary').v2


cloudinary.uploader.destroy('pvlq3ftmix1qmr3idbb3').then(result=>console.log(result))

