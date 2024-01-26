import multer from "multer";
import path from "path";

const temporaryStorage = path.resolve("temp");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, temporaryStorage);
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const limits = {
  fieldSize: 5e6,
};

const upload = multer({
  storage,
  limits,
});

export default upload;
