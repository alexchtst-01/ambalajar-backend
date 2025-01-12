import User from "../models/sql/User.js";
import { compare } from "bcrypt";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // email dan password validation field
    if (!email || !password) {
      return res.status(400).json({ msg: "Email dan password harus diisi" });
    }

    // existing user by email
    const existuser = await User.findOne({
      where: { email: email },
    });
    if (!existuser) {
      return res.status(404).json({
        msg: "user tidak ditemukan",
        data: {
          nonExistingEmail: email,
          isLoggedIn: false,
        },
      });
    }

    // match the password
    const isMatch = await compare(password, existuser.password);
    if (!isMatch) {
      return res.status(403).json({
        msg: "password yang anda masukan salah",
        data: {
          wrongPassword: password,
        },
      });
    }

    // set session
    req.session.userId = existuser.userId;
    req.session.role = existuser.role;

    return res.status(200).json({
      msg: "successfully login",
      data: {
        userId:
          existuser.userId /* kalo di development perlu kalo di production ga perlu */,
        email: existuser.email,
        role: existuser.role,
        isLoggedIn: true,
      },
    });
  } catch (error) {
    res.status(500).json({
      msg: `terjadi kesalahan ${error.message}`,
      data: {
        err: error,
      },
    });
  }
};

export const me = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(400).json({
        msg: "anda tidak login",
        data: {
          getmeInfo: "session tidak ditemukan",
        },
      });
    }
    const existuser = await User.findOne({
      where: { userId: req.session.userId },
    });
    return res.status(200).json({
      msg: "anda sudah terauthentikasi dan login",
      data: {
        userId:
          existuser.userId /* kalo di development perlu kalo di production ga perlu */,
        email: existuser.email,
        role: existuser.role,
        isLoggedIn: true,
      },
    });
  } catch (error) {
    res.status(500).json({
      msg: `terjadi kesalahan ${error.message}`,
      data: {
        err: error,
      },
    });
  }
};

export const logout = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(400).json({
        msg: "anda tidak login",
        data: {
          logoutInfo: "session tidak ditemukan",
        },
      });
    }
    req.session.destroy((error) => {
      if (error) {
        return res.status(400).json({
          msg: `terjadi kesalahan logout ${error.message}`,
          data: {
            logoutInfo: error,
          },
        });
      }
      return res.status(200).json({
        msg: "anda berhasil logout",
        data: {},
      });
    });
  } catch (error) {
    res.status(500).json({
      msg: `terjadi kesalahan ${error.message}`,
      data: {
        err: error,
      },
    });
  }
};
