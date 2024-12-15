import dotenv from "dotenv";
import mainDB from "../database/mainDb.js";
import mongoose from "mongoose";

dotenv.config();

const configMainDB = async () => {
  try {
    await mainDB.authenticate();
    console.log("berhasil mengauthentikasi ke database");
    await mainDB.sync();
    console.log("berhasil terkonfigurasi ke database");
    return true;
  } catch (error) {
    console.log(`terjadi kesalahan configurasi ke mainDB ${error.message}`);
    return false;
  }
};

const configSecondaryDB = async () => {
  try {
    await mongoose.connect(process.env.CONN_MONGO);
    console.log("berashil terkoneksi ke mongodb");
    return true;
  } catch (error) {
    console.log(`terjadi kesalahan configurasi ke mainDB ${error.message}`);
    return false;
  }
};

export { configSecondaryDB, configMainDB };
