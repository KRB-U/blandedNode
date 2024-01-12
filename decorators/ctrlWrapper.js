const ctrlWrapper = (ctrl) => async (req, res, next) => {
  try {
    ctrl(req, res, next);
  } catch (error) {
    next(error);
  }
};

export default ctrlWrapper;
