import { v2 as cloudinary } from "cloudinary";

const options = {
  //   secure: true,
  api_key: "722311163223339",
  api_secret: "nBURgs2ssd3fvHsHTedfhJcSdwneAkVzWUBrA",
  cloud_name: "dnfdyvhjzyhty",
};

cloudinary.config(options);

const updateAvatar = async function (req, res, next) {
  const { path, filename } = req.file;

  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    transformation: [{ height: 250, width: 250, crop: "scale" }],
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(path, options);
    console.log(result);
    res.json("ok");
  } catch (error) {
    console.error(error);
  }
};
export { updateAvatar };
