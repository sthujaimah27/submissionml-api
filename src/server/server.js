const Hapi = require("@hapi/hapi");
require("dotenv").config();

const loadModel = require("../services/loadModel");
const routes = require("../server/routes");
const InputError = require("../exceptions/InputError");

(async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: "0.0.0.0",
    routes: {
      cors: {
        origin: ["*"],
      },
      payload: {
        maxBytes: 1000000, 
      },
    },
  });

  // Memuat model dan menyimpannya di objek
  const model = await loadModel();
  server.app.model = model;

  // mendaftarkan rute yang telah didefinisikan
  server.route(routes);

  server.ext("onPreResponse", (request, h) => {
    const response = request.response;

    if (response instanceof InputError) {
      const newResponse = h.response({
        status: "fail",
        message: `Terjadi kesalahan dalam melakukan prediksi`,
      });

      newResponse.code(response.statusCode);
      return newResponse;
    }

    if (response.isBoom) {
      const newResponse = h.response({
        status: "fail",
        message: response.message,
      });

      newResponse.code(response.output.statusCode);
      return newResponse;
    }

    return h.continue;
  });

  await server.start();

  console.log(`Server is running at : ${server.info.uri}`);
})();
