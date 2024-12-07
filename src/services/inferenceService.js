const tf = require("@tensorflow/tfjs-node");
const InputError = require("../exceptions/InputError");

// FUngsi untuk melakukan prediksi klasifikasi
async function classificationPredict(model, image) {
  try {
    
    // Mengonversi gambar input menjadi tensor yang dapat digunakan oleh model
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

      // kelas hasil prediksi
    const classes = ["Cancer", "Non-cancer"];

    const prediction = model.predict(tensor);
    const score = await prediction.data();

    const confidenceScore = score[0] * 100;
    const label = score[0] > 0.5 ? classes[0] : classes[1];

    // menentukan saran berdasarkan label prediksi
    const suggestion =
      label === "Cancer"
        ? "Segera periksa ke dokter!"
        : "Penyakit kanker tidak terdeteksi.";

    return { confidenceScore, label, suggestion };
  } catch (error) {
    throw new InputError(`Terjadi kesalahan input: ${error.message}`);
  }
}

module.exports = classificationPredict;
