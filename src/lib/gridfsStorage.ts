// import multer from 'multer';
// import GridFsStorage from 'multer-gridfs-storage';


// const mongoUri = process.env.NEXT_PUBLIC_MONGODB_URI!; // Ensure you have the URI

// const storage = new GridFsStorage({
//   url: mongoUri,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       const filename = `${Date.now()}-${file.originalname}`;
//       const fileInfo = {
//         filename,
//         contentType: file.mimetype,
//         metadata: { // Optional metadata for your files
//           originalName: file.originalname,
//         },
//       };
//       resolve(fileInfo);
//     });
//   },
// });

// const upload = multer({ storage });

// export { upload };
