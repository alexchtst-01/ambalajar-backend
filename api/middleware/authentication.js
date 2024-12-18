import User from "../models/sql/User.js";

export const AuthenUser = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      return res.status(400).json({
        msg: "anda tidak login",
        data: {
          info: "session tidak ditemukan",
        },
      });
    }
    const existData = await User.findOne({
      where: { userId: req.session.userId },
    });
    if (!existData) {
      if (!req.session.userId) {
        return res.status(400).json({
          msg: "credential tidak valid",
          data: {
            invalidInfo: "session anda tidak valid",
          },
        });
      }
    }
    req.userId = existData.userId;
    req.role = existData.role;
    req.email = existData.email;
    next();
  } catch (error) {
    res.status(500).json({
      msg: `terjadi kesalahan ${error.message}`,
      data: {
        err: error,
      },
    });
  }
};
