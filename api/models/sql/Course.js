import { DataTypes } from "sequelize";
import mainDB from "../../database/mainDb.js";

const Course = mainDB.define(
  "course",
  {
    courseId: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "deskripsi belom diisi",
      validate: {
        notEmpty: true,
      },
    },
    enrolKey: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
  },
  { timestamps: true }
);

export async function courseseeder() {
  const courses = [
    {
      name: "Dasar-dasar Pemrograman",
      desc: "Kursus ini mengajarkan konsep dasar pemrograman menggunakan bahasa pemrograman populer seperti Python, termasuk pengenalan variabel, struktur kontrol, dan fungsi.",
    },
    {
      name: "Desain Web Responsif",
      desc: "Pelajari cara mendesain halaman web yang responsif dan menarik dengan menggunakan HTML, CSS, dan JavaScript untuk tampilan yang optimal di berbagai perangkat.",
    },
    {
      name: "Pengenalan Kecerdasan Buatan",
      desc: "Kursus ini memberikan pemahaman dasar tentang kecerdasan buatan (AI), termasuk teknik-teknik dasar seperti machine learning, neural networks, dan algoritma pencarian.",
    },
    {
      name: "Fotografi Digital",
      desc: "Pelajari teknik dasar dan lanjutan dalam fotografi digital, termasuk pengaturan kamera, komposisi gambar, serta tips dan trik untuk hasil foto yang lebih baik.",
    },
    {
      name: "Manajemen Proyek Agile",
      desc: "Kursus ini memberikan pemahaman tentang metodologi Agile dalam manajemen proyek, termasuk Scrum, Kanban, dan cara mengelola proyek dengan tim yang dinamis dan fleksibel.",
    },
    {
      name: "Pemasaran Digital",
      desc: "Fokus pada strategi pemasaran digital yang efektif, termasuk SEO, iklan online, media sosial, dan analisis data untuk meningkatkan visibilitas dan konversi bisnis secara online.",
    },
    {
      name: "Analisis Data dengan Python",
      desc: "Kursus ini mengajarkan penggunaan Python untuk analisis data, dengan fokus pada teknik manipulasi data, visualisasi, dan penggunaan pustaka seperti Pandas dan Matplotlib.",
    },
    {
      name: "Kepemimpinan dan Pengembangan Tim",
      desc: "Meningkatkan keterampilan kepemimpinan dengan fokus pada pengelolaan tim, komunikasi efektif, serta pengembangan potensi anggota tim untuk mencapai tujuan bersama.",
    },
  ];

  for (const course of courses) {
    Course.create(course);
  }
}

export default Course;
