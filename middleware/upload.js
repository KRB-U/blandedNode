import multer from "multer";
import path from "path";

const tmpPath = path.resolve("tmp/my-uploads");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tmpPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const limits = { fieldSize: 300000 };

const upload = multer({ storage, limits });

export default upload;
