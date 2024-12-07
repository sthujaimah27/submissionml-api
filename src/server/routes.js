const { HandlerPostPredict, HandlerGetPredict } = require("../server/handler");

// Mendefinisikan rute untuk aplikasi
const routes = [
  {
    path: "/predict",
    method: "POST",
    handler: HandlerPostPredict,
    options: {
      payload: {
        allow: "multipart/form-data",
        multipart: true,
        maxBytes: 1000000,
      },
    },
  },
  {
    path: "/predict/histories",
    method: "GET",
    handler: HandlerGetPredict,
  },
];

// Mengekspor rute agar dapat digunakan dimodul lain
module.exports = routes;
