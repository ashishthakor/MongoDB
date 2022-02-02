require('./db/mongoose');
const express = require('express');

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const port = process.env.PORT || 3000;
const app = express();

// how to upload file in express

const multer = require('multer');
const upload = multer({
  dest: 'images',
  limits: {
    fileSize: 1000000, //limit by file size
  },
  fileFilter(req, file, cb) {
    // if (!file.originalname.endsWith('.pdf')) {
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error('Please upload a Word Document'));
    }

    cb(undefined, true);
  },
});
app.post(
  '/upload',
  upload.single('upload'),
  (req, res) => {
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log('Server is started on Port', port);
});
