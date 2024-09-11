export const myProfile = async (req, res, next) => {
  try {
    const user = req.user;
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
