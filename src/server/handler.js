const predictClassification = require("../services/inferenceService");
const { storeData, getAllData } = require("../services/storeData");
const crypto = require("crypto");

// Handler untuk menangani permintaan POST predikri
async function HandlerPostPredict(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  //Melakukan prediksi dengan menggunakan model
  const { confidenceScore, label, suggestion } = await predictClassification(
    model, image
  );

  // Membentuk ID unik dan timestamp untuk data prediksi
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  // Membentuk objek data hasil prediksi
  const data = {
    id: id,
    result: label,
    suggestion: suggestion,
    createdAt: createdAt,
  };

  // menyimpan data prediksi ke penyimpanan
  await storeData(id, data);

  // respon sukses
  const response = h.response({
    status: "success",
    message: "Model is predicted successfully",
    data,
  });

  response.code(201);
  return response;
}

// Handler untuk menangani get prediksi
async function HandlerGetPredict(request, h) {
  const data = await getAllData();

  // Respon sukses
  const response = h.response({
    status: "success",
    data,
  });

  response.code(200);
  return response;
}

// Mengekspor semua handler agar bisa digunakan di modul lain
module.exports = { HandlerPostPredict, HandlerGetPredict };
